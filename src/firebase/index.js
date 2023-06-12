import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTLLlnOT6NMqb6HJ_hP5ZHfgv2nKHapTI",
  authDomain: "summative-fbe42.firebaseapp.com",
  projectId: "summative-fbe42",
  storageBucket: "summative-fbe42.appspot.com",
  messagingSenderId: "351008573112",
  appId: "1:351008573112:web:426b719249426433e9564d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(config);
export const firestore = getFirestore(config);