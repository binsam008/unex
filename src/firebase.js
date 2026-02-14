import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdJuziTnYwFBQAJ61oF_PB5IBQX4qyeCw",
  authDomain: "unex-8dfa5.firebaseapp.com",
  projectId: "unex-8dfa5",
  storageBucket: "unex-8dfa5.firebasestorage.app",
  messagingSenderId: "721894993085",
  appId: "1:721894993085:web:693d7c18e58b52ad731bd4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
