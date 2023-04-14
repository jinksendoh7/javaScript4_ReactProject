import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3Dpa2T8RXA8nYAeRSfTavsedbs8tEQXQ",
  authDomain: "js4-finalproject-a60e4.firebaseapp.com",
  projectId: "js4-finalproject-a60e4",
  storageBucket: "js4-finalproject-a60e4.appspot.com",
  messagingSenderId: "921232400165",
  appId: "1:921232400165:web:95714ed942aa794db604cc"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);