import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5L-6jKNoJLVG-A4WhUFxDEIMDs1XraYM",
  authDomain: "myloginapp-bbd98.firebaseapp.com",
  projectId: "myloginapp-bbd98",
  storageBucket: "myloginapp-bbd98.firebasestorage.app",
  messagingSenderId: "686407578189",
  appId: "1:686407578189:web:ad5b15bf6bd3f8c807a204",
  measurementId: "G-6XJ11ZTR91",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
