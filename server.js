// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const xlsx = require('xlsx');
const crypto = require('crypto');
const twilio = require('twilio');

// Initialize express and constants
const app = express();
const PORT = 5000;
const saltRounds = 10; // Salt rounds for bcrypt

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// Rate Limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts from this IP, please try again later.',
});

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://honorsproject-5c497-default-rtdb.firebaseio.com"
});
const db = admin.firestore();

// Twilio credentials 
const accountSid = 'ACa3c767747265af29ec89e62925a8360f';
const authToken = '322905939c37a46137d7c35aca4173ae';
const client = new twilio(accountSid, authToken);

// Endpoint to send SMS
app.post('/send-sms', (req, res) => {
  const { to, body } = req.body;

  console.log('Request body:', req.body); 
  console.log('Sending to:', to);

  if (!to || !body) {
    return res.status(400).send({ success: false, message: 'Phone number and message body are required.' });
  }

  client.messages
    .create({
      body,
      to,
      from: '+19388391386'
    })
    .then(message => res.status(200).send({ success: true, messageSid: message.sid }))
    .catch(error => {
        console.error('Twilio error:', error);
        res.status(500).send({ success: false, error: error.message });
      });
  });

// Authentication endpoint
app.post('/login', loginLimiter, async (req, res) => {
    const { code, password } = req.body;
    console.log(`Received code: ${code}, password: ${password}`); // Debugging

    try {
        const hospitalRef = db.collection('hospitals').doc(code);
        const doc = await hospitalRef.get();

        if (!doc.exists) {
            console.log(`Hospital with code ${code} does not exist.`);
            return res.status(401).json({ success: false, message: 'Invalid hospital code' });
        }

        const hospitalData = doc.data();
        const passwordMatch = await bcrypt.compare(password, hospitalData.password);

        if (passwordMatch) {
            res.json({ success: true, hospital: hospitalData });
        } else {
            console.log(`Invalid password for hospital with code ${code}.`);
            res.status(401).json({ success: false, message: 'Invalid password' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ success: false, message: 'Error logging in' });
    }
});

// Donation endpoint
app.post('/api/donate', async (req, res) => {
    console.log('POST /api/donate route hit');
    const { name, phone, location, address } = req.body;
    console.log('Request body:', req.body); 

    if (!name || !phone || !location) {
        return res.status(400).json({ message: 'Name, phone, and location are required.' });
    }

    const donationData = {
        name,
        phone,
        location,
        address,
        timestamp: new Date().toISOString()
    };

    try {
        console.log('The donation data', donationData);
        await db.collection('donations').add(donationData);
         // Confirm successful addition
        console.log('Donation data added successfully.');

        res.status(201).json({ success: true, message: 'Donation details saved successfully.' });
    } catch (error) {
        console.error('Error saving donation details:', error);
        res.status(500).json({ success: false, message: 'Error saving donation details.' });
    }
});


// Helper functions
const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};

const generatePassword = () => {
    return crypto.randomBytes(8).toString('hex'); // Generates a random password
};

const uploadData = async () => {
    const workbook = xlsx.readFile('kenya-health-facilities.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    console.log('Fetching existing hospitals from the database...');
    let existingHospitalsSnapshot;
    try {
        existingHospitalsSnapshot = await db.collection('hospitals').get();
    } catch (error) {
        console.error('Error fetching existing hospitals:', error);
        return;
    }
    const existingHospitalCodes = new Set();
    existingHospitalsSnapshot.forEach(doc => existingHospitalCodes.add(doc.id));

    console.log(`Starting the upload process in ${process.env.NODE_ENV} mode...`);
    let batch = db.batch(); // Initialize a batch
    let batchCount = 0;

    for (const row of data) {
        const code = row['code'];
        const name = row['name'];

        if (code && name) {
            if (existingHospitalCodes.has(code)) {
                console.log(`Hospital with code ${code} already exists.`);
                continue; // Skip to the next iteration if the hospital exists
            }

            const password = generatePassword(); // Generate a password for the hospital
            const hashedPassword = await hashPassword(password); // Hash the password

            // Log the plain-text password (for debugging purposes)
            if (process.env.NODE_ENV === 'development') {
                console.log(`Hospital Code: ${code}, Password: ${password}`);
            }

            const hospitalRef = db.collection('hospitals').doc(code);
            batch.set(hospitalRef, {
                name: name.trim(),
                password: hashedPassword // Store the hashed password
            });

            existingHospitalCodes.add(code); // Add the new code to the set

            batchCount++;
            if (batchCount === 500) {
                // Commit the batch after every 500 writes to prevent exceeding Firestore limits
                try {
                    await batch.commit();
                } catch (error) {
                    console.error('Batch commit failed, retrying...', error);
                    // Implement exponential backoff
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
                    await batch.commit(); // Retry
                }
                batchCount = 0; // Reset the counter
                batch = db.batch(); // Re-initialize the batch
            }

            // Log success message
            console.log(`Successfully added hospital: ${name} with code: ${code}`);
        } else {
            console.error('Missing code or name:', row);
        }
    }

    // Commit any remaining writes
    if (batchCount > 0) {
        try {
            await batch.commit();
        } catch (error) {
            console.error('Final batch commit failed, retrying...', error);
            // Implement exponential backoff
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
            await batch.commit(); // Retry
        }
    }

    console.log('Data import completed.');
};

// Run the function
uploadData().then(() => {
    console.log('Data import completed.');
}).catch(err => {
    console.error('Data import failed:', err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





// // Endpoint to add a hospital request
// app.post('/hospital-requests', async (req, res) => {
//     const { hospitalName, requestType, description } = req.body;

//     if (!hospitalName || !requestType) {
//         return res.status(400).json({ success: false, message: 'Hospital name and request type are required.' });
//     }

//     const requestData = {
//         hospitalName,
//         requestType,
//         description,
//         timestamp: new Date().toISOString()
//     };

//     try {
//         await db.collection('hospital-requests').add(requestData);
//         res.status(201).json({ success: true, message: 'Hospital request added successfully.' });
//     } catch (error) {
//         console.error('Error adding hospital request:', error);
//         res.status(500).json({ success: false, message: 'Error adding hospital request.' });
//     }