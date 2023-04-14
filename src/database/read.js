import { db } from '../configs/firebase'
import { collection, getDocs, getDoc, doc, query, orderBy } from "firebase/firestore";

export const load = async (collectionName, sort) => {
  let data = [];
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id
      });
    });
    return data;
  }
  catch (error) {
    throw new Error('Failed to load the database');
  }
}

export const loadById = async (collectionName, id) => {
  let data = [];
  try {
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
  catch (error) {
    throw new Error('Failed to load the data in the database' + error);
  }

}
