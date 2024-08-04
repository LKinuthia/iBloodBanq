from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# Load the dataset
df = pd.read_csv('blood_supply_demand_kenya.csv')

# Data preparation for Dash
blood_type_sums = df.groupby('Blood Type')['Supply'].sum().reset_index()
numeric_cols = ['Population', 'Temperature', 'Donations', 'Usage', 'Supply']
df_numeric = df[numeric_cols]
corr_matrix = df_numeric.corr()
df['Date'] = pd.to_datetime(df['Date'], dayfirst=True)

# Initialize Firebase
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


# Load the trained GRU model
try:
    model = tf.keras.models.load_model('gru_model.h5')
except FileNotFoundError:
    print("Model file 'gru_model.h5' not found.")
    model = None


@app.route('/dashboard/', methods=['GET'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        # Fetch historical data from Firebase Firestore
        collection_ref = db.collection('blood_records')
        docs = collection_ref.stream()

        blood_stock_data = []
        for doc in docs:
            blood_stock_data.append(doc.to_dict())

        # Create a DataFrame from the blood stock data
        blood_stock_df = pd.DataFrame(blood_stock_data)

        # Ensure all necessary columns are present and convert them to numeric
        required_columns = ['amount', 'type', 'date', 'donations', 'event', 'location', 'supply', 'temperature']
        for col in required_columns:
            if col not in blood_stock_df.columns:
                blood_stock_df[col] = 0

        # Prepare the data for prediction
        blood_stock_df['Population'] = 0  # Example value, you might want to adjust this
        blood_stock_df['Donations'] = pd.to_numeric(blood_stock_df['amount'], errors='coerce')
        blood_stock_df['Supply'] = pd.to_numeric(blood_stock_df['supply'], errors='coerce')
        blood_stock_df['Usage'] = 0  # Example value
        blood_stock_df['Temperature'] = pd.to_numeric(blood_stock_df['temperature'], errors='coerce')

        # Convert 'type' to categorical if necessary
        blood_stock_df['Blood Type'] = blood_stock_df['type']
        blood_stock_df.drop('type', axis=1, inplace=True)

        # Convert 'date' to datetime
        blood_stock_df['date'] = pd.to_datetime(blood_stock_df['date'], errors='coerce')

        # Ensure we have all required columns for prediction
        prediction_columns = ['Supply']
        missing_columns = [col for col in prediction_columns if col not in blood_stock_df.columns]
        if missing_columns:
            return jsonify({'error': f'Missing required columns: {missing_columns}'}), 500
        
        
        # Convert DataFrame to the format expected by the model
        values = blood_stock_df[prediction_columns].values

        print(f"Original data shape: {values.shape}")
        # Reshape data for the GRU model (batch_size, timesteps, features)
        timesteps = 1 
        num_features = values.shape[1]
        batch_size = values.shape[0]

        input_data = np.reshape(values, (batch_size, timesteps, num_features))

        # Check the shape
        print(f"Reshaped input data shape: {input_data.shape}")

        # Predict
        predictions_scaled = model.predict(input_data)

        # Convert predictions to float
        predictions_scaled = predictions_scaled.astype(float)

         # Create a response structure with the predictions
        response = []
        for i in range(len(predictions_scaled)):
            entry = {
                'Date': blood_stock_df['date'].iloc[i].strftime('%Y-%m-%d'),
                'Supply': float(blood_stock_df['Supply'].iloc[i]),
                'Prediction': float(predictions_scaled[i][0]) 
            }
            response.append(entry)

        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/')
def home():
    return "Blood Supply and Demand API"

@app.route('/data', methods=['GET'])
def get_data():
    specific_date = "30/06/2024"
    filtered_df = df[df['Date'] == specific_date]
    filtered_data = filtered_df[['Supplied', 'Location', 'Blood Type', 'Use', 'Donate']].to_dict(orient='records')
    return jsonify(filtered_data)

@app.route('/data/<int:row_id>', methods=['GET'])
def get_data_row(row_id):
    if row_id < 0 or row_id >= len(df):
        return jsonify({'error': 'Row ID out of range'}), 404
    return jsonify(df.iloc[row_id].to_dict())

@app.route('/data/query', methods=['GET'])
def query_data():
    location = request.args.get('location')
    blood_type = request.args.get('blood_type')
    filtered_df = df
    if location:
        filtered_df = filtered_df[filtered_df['Location'] == location]
    if blood_type:
        filtered_df = filtered_df[filtered_df['Blood Type'] == blood_type]
    return jsonify(filtered_df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
