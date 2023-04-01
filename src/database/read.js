import { collection, getDocs } from "firebase/firestore";
import {db} from '../configs/firebase'

export const load = async(collectionName) =>{
    let data = [];
    try{
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach((doc) => {
          data.push({
            ...doc.data(),
            id: doc.id
           });
        });
       return data;
    }
    catch(error){
        throw new Error('Failed to load the database');
    }
  }

