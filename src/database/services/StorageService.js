
import { db } from '../../configs/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export default class StorageService {
    
    static async createDoc(docName, doc) {
        try {
            const docRef = await addDoc(collection(db, docName), doc);
            return docRef;
        }catch(e) {
            console.log('Error saving in ', docName, 'with collection name =>', doc);
        }
    }
}