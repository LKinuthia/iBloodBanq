import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, getDoc } from 'firebase/firestore';

const bloodCollectionRef = collection(db, 'blood_records');

const addOrUpdateBloodRecord = async (newRecord) => {
    try {
        // Check if a record with the same location exists
        const q = query(bloodCollectionRef, where("location", "==", newRecord.location));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const existingDoc = querySnapshot.docs[0];
            const existingRecord = { ...existingDoc.data(), id: existingDoc.id };

            if (!existingRecord.bloodStock) {
                existingRecord.bloodStock = [];
            }

            // Check if blood type exists in the stock
            const bloodTypeIndex = existingRecord.bloodStock.findIndex(stock => stock.type === newRecord.bloodType);

            if (bloodTypeIndex !== -1) {
                // Update existing blood type amount
                existingRecord.bloodStock[bloodTypeIndex].amount = parseInt(newRecord.donations, 10);
            } else {
                // Add new blood type to the stock
                existingRecord.bloodStock.push({ type: newRecord.bloodType, amount: parseInt(newRecord.donations, 10) });
            }

            const recordDoc = doc(db, 'blood_records', existingRecord.id);
            await updateDoc(recordDoc, { bloodStock: existingRecord.bloodStock });
        } else {
            // If no existing record, add a new one
            await addDoc(bloodCollectionRef, {
                ...newRecord,
                bloodStock: [{ type: newRecord.bloodType, amount: parseInt(newRecord.donations, 10) }]
            });
        }
    } catch (error) {
        console.error("Error adding or updating blood record:", error);
        throw error;
    }
};

const getBloodRecords = async () => {
    const data = await getDocs(bloodCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const updateBloodRecord = async (id, updatedRecord) => {
    try {
        const recordDoc = doc(db, 'blood_records', id);
        const docSnapshot = await getDoc(recordDoc);

        if (!docSnapshot.exists()) {
            throw new Error(`Record with id ${id} does not exist`);
        }

        const existingRecord = docSnapshot.data();

        const updatedBloodStock = existingRecord.bloodStock.map(stock =>
            stock.type === updatedRecord.bloodType
                ? { ...stock, amount: parseInt(updatedRecord.donations, 10) }
                : stock
        );

        await updateDoc(recordDoc, {
            bloodStock: updatedBloodStock
        });
    } catch (error) {
        console.error("Error updating blood record:", error);
        throw error;
    }
};

const deleteBloodRecord = async (id) => {
    try {
        const recordDoc = doc(db, 'blood_records', id);
        await deleteDoc(recordDoc);
    } catch (error) {
        console.error("Error deleting blood record:", error);
        throw error;
    }
};

export { addOrUpdateBloodRecord, getBloodRecords, updateBloodRecord, deleteBloodRecord};
