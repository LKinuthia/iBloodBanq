// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc,  doc } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnCOW6sqc9o5TC5lVvx_eDt8YRnXgKaHI",
  authDomain: "honorsproject-5c497.firebaseapp.com",
  databaseURL: "https://honorsproject-5c497-default-rtdb.firebaseio.com",
  projectId: "honorsproject-5c497",
  storageBucket: "honorsproject-5c497.appspot.com",
  messagingSenderId: "402324518004",
  appId: "1:402324518004:web:bee2f0f02c2af0e0dccd21",
  measurementId: "G-9DVZYN7P99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { db, collection, addDoc, query, where, getDocs, updateDoc, doc };