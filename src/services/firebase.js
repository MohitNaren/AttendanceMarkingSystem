// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4Ir35B2HRN6Q7KA4HyFJeBmjaWutoeCY",
  authDomain: "attendance-marking-shashank.firebaseapp.com",
  projectId: "attendance-marking-shashank",
  storageBucket: "attendance-marking-shashank.firebasestorage.app",
  messagingSenderId: "959874383711",
  appId: "1:959874383711:web:73da574f2eaa02865a80ea",
  measurementId: "G-VHPERX8RDF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
const db = getFirestore(app);

console.log("🔥 Firebase initialized successfully with project:", firebaseConfig.projectId);

export { db }