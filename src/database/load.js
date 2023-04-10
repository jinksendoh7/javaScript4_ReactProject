
import { db } from '../Configuration/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';


export async function loadCustomerDeals() {
    try {
        const querySnapshot = await getDocs(collection(db, 'CustomerDeals'));
        const data = [];
        querySnapshot.forEach( (doc) => {
            data.push({
                ...doc.data(),
                id: doc.id
            });
        });
        return data;
    } 
    catch (error) {
        throw new Error('Failed to load database');
    }
}
