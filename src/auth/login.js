import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth';
import {auth} from '../configs/firebase';

export const login = async(email, password) =>{
    try{
      const auth = getAuth();
      const userAuth = await signInWithEmailAndPassword(auth, email, password)
      return userAuth.user;
    }
    catch(error){
        console.log(error);
    }
  }
