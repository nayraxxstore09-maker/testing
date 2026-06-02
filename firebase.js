import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// Your verified nyroxx-store web app Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3rNtyppCmsnsPcG3TjX4sh-72tVArkec",
  authDomain: "nyroxx-store.firebaseapp.com",
  projectId: "nyroxx-store",
  storageBucket: "nyroxx-store.firebasestorage.app",
  messagingSenderId: "744553006910",
  appId: "1:744553006910:web:ad1692f54b2165caf74e6f",
  measurementId: "G-SE3PQS2HNK"
};

// Initialize app instances
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);