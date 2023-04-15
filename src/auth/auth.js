import { auth } from '../configs/firebase'

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const SignUpWithFirebaseAuth = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return (result.user)
  } catch (error) {
    new Error(error)
  }
}

export const login = async (email, password) => {
  try {
    const userAuth = await signInWithEmailAndPassword(auth, email, password)
    return userAuth.user;
  }
  catch (error) {
    new Error(error)
  }
}

export const logout = async () => {
  try {
    auth.signOut();
    return true;
  }
  catch (error) {
    new Error(error)
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
    new Error(error)
  }
}

