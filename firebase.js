//Database
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCE24HkJsCXXv9fvI8spGBTxR054tBpUro",
  authDomain: "metickapp.firebaseapp.com",
  projectId: "metickapp",
  storageBucket: "metickapp.appspot.com",
  messagingSenderId: "879457628453",
  appId: "1:879457628453:web:6a9f07e4437c9e2ec06acc",
  measurementId: "G-2YN4DXM2Q4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db=getFirestore();


export {
    auth,
    db
}

