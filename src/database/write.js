import { collection, addDoc, updateDoc,doc, deleteDoc } from "firebase/firestore";
import {db} from '../configs/firebase'

export const save = async(collectionName, data) =>{

    try{
        const docRef = await addDoc(collection(db, collectionName), data);
        return docRef.id;
    
    }
    catch(error){
        throw error
    }
}

export const update = async(collectionName, status, id) =>{

    try{
        const docRef =  doc(db, collectionName,id);
        await updateDoc(docRef, {
            done: status
        });
        return true;
    
    }
    catch(error){
      
        throw new Error('Failed to updated data in the database');
    }
}

export const remove = async(collectionName,  id) =>{

    try{
        await deleteDoc(doc(db, collectionName,id));
        return true
        
    }
    catch(error){
        throw new Error('Failed to remove data in the database');;
    }
    }

 
 