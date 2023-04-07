import {
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth';
import {auth} from '../configs/firebase'
export const login = async(email, password) =>{
    try{
      const userAuth = await signInWithEmailAndPassword(auth, email, password)
      return userAuth.user;
    }
    catch(error){
        console.log(error);
    }
  }
export const logout = async()=>{
  try{
     auth.signOut();
     return true;
  }
  catch(error){
      console.log(error);
  }
}
export const guardAuth = async()=>{
  try{
    await onAuthStateChanged(auth, (userAuth) => {
     
      if (userAuth) {
        const user = {   
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL
        }
        return user;
      } else {
        return null;
      }
    });
  }
  catch(error){
      console.log(error);
  }

}
export const loginWithGoogle = async()=>{
    console.log('Logging in...')
}