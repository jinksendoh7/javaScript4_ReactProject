import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../configs/firebase'


export const SignUpWithFirebaseAuth = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return (result.user)
  }catch(e) {
    console.log(e)
  }
}


export const login = async (email, password) => {
  try {
    const userAuth = await signInWithEmailAndPassword(auth, email, password)
    return userAuth.user;
  }
  catch (error) {
    console.log(error);
  }
}

export const logout = async () => {
  try {
    auth.signOut();
    return true;
  }
  catch (error) {
    console.log(error);
  }
}

export const guardAuth = async () => {
  try {
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
  catch (error) {
    console.log(error);
  }

}

async function updateEmailForCurrentUser(currentUser, email) {
  return await updateEmail(currentUser, email);
}

async function updatePasswordForCurrentUser(currentUser,password) {
  return await updatePassword(currentUser, password);
}