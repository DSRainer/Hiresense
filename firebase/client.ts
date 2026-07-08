// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs9c1LtuqofTpzekrO8cdzTNPlad1K3IA",
  authDomain: "hiresense-1cc79.firebaseapp.com",
  projectId: "hiresense-1cc79",
  storageBucket: "hiresense-1cc79.firebasestorage.app",
  messagingSenderId: "798257226075",
  appId: "1:798257226075:web:89fc2f4be8793352bcba7e"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
