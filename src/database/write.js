import { db } from "../configs/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../configs/firebase";


import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";

export const save = async (collectionName, data) => {
    //console.log('Adding...')
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        return docRef.id;
    }
    catch (error) {
        throw error
    }
}

export const update = async (collectionName, data, id) => {
    //console.log('Updating....');
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, data);
        console.log('Success updating: ', docRef.id)
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

export const remove = async (collectionName, id) => {
    //console.log('Removing...')
    try {
        await deleteDoc(doc(db, collectionName, id));
        return true
    }
    catch (error) {
        throw new Error('Failed to remove data in the database');;
    }
}

export const reset = async (email) => {
    try{
        await sendPasswordResetEmail(auth, email);
        console.log('Password has been reset');
    } catch(error) {
        console.error(error);
        //alert('Please verify you have the correct email.');
    }
}


