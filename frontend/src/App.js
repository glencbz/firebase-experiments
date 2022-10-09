import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { auth, provider } from './firebase';
import { getRedirectResult, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

function useFirebaseAuth(setUser) {
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUser(JSON.stringify(user, null, 2));
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }, []);
  return {
    signIn: useCallback(() => signInWithRedirect(auth, provider)),
  }
}

function App() {
  const [user, setUser] = useState(null);
  const {
    signIn: firebaseSignIn
  } = useFirebaseAuth(setUser);

  return (
    <div className="App">
      {user ?
        <p>{user}</p>
        : <button onClick={firebaseSignIn}>Sign In</button>}
    </div>
  );
}

export default App;
