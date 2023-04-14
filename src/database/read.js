import { collection, getDocs, getDoc, doc, query, orderBy } from "firebase/firestore";
import {db} from '../configs/firebase'

export const load = async(collectionName, sort) =>{
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
  
  export const loadById = async(collectionName, id) =>{
    let data = [];
    try{
          const docRef = doc(db, collectionName, id);
          const query = await getDoc(docRef);
          if (query.exists()) {
                data.push({
                  ...query.data(),
                  id: query.id
                });
          }
          return data;
    }
    catch(error){
        throw new Error('Failed to load the data in the database' + error);
    }
  }

export const chkIfUserActive = async(collectionName, id) =>{
  try{
    const querySnapshot = await getDocs(query(collection(db, collectionName), orderBy('timestamp')));
    querySnapshot.forEach((doc) => {
      if(id == doc.data().id && doc.data().isActive){
        return true;
      }
   
    });
        return false;
  }
  catch(error){
      throw new Error('Failed to load the data in the database' + error);
  }
}


export const loadByParamId = async(collectionName, paramId)=>{
  let data = [];
  try{
  
    const querySnapshot = await getDocs(query(collection(db, collectionName), orderBy('createdAt')));
    querySnapshot.forEach((doc) => {
      if(paramId == doc.data().id){
        data.push({
          ...doc.data(),
          id: doc.id
         });
      }
   
    });
   return data;
}
  catch(error){
      throw new Error('Failed to load the data in the database' + error);
  }
}

export const countTotalById = async(collectionName, paramId) =>{

 let count =0;
  try{
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      if(paramId === doc.data().vehicleId){
          count++;
      }
    });
  return count;
}
  catch(error){
      throw new Error('Failed to load the data in the database' + error);
  }
}