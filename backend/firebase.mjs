// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6NBAxa9ZrRRNLjIb4iD3yc-CTzyoPqQ8",
  authDomain: "call-home-firebase-auth-test.firebaseapp.com",
  projectId: "call-home-firebase-auth-test",
  storageBucket: "call-home-firebase-auth-test.appspot.com",
  messagingSenderId: "209220158556",
  appId: "1:209220158556:web:0463b80143ee4bc79c9299",
  measurementId: "G-D5M71JVXNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

async function firebaseSignIn(token) {
  // Build Firebase credential with the Google ID token.
  const credential = GoogleAuthProvider.credential(token);

  // Sign in with credential from the Google user.
  try {
    const result = await signInWithCredential(auth, credential);
    console.log('Got result', result);
    return GoogleAuthProvider.credentialFromResult(result);
  } catch (error) {
    console.error(error);
  }
}

export {
  auth,
  app,
  provider,
  firebaseSignIn,
}
