import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { auth, provider } from './firebase';
import { getRedirectResult, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const BACKEND_HOST = 'http://localhost:1008';

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

const GOOGLE_URL = `${BACKEND_HOST}/login/google`;
function useGoogleAuth(setUser) {
  const postResponse = useCallback((authResponse) => {
    fetch(GOOGLE_URL, {
      method: 'POST',
      body: authResponse.credential,
    })
      .then(response => response.text())
      .then(body => { setUser(body) });
  }, []);

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "209220158556-frsgjh92d58csoab0piejg693f6jucls.apps.googleusercontent.com",
      callback: postResponse,
    });
    window.google.accounts.id.renderButton(
      // This in the static html
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    window.google.accounts.id.prompt(); // also display the One Tap dialog
  }, [])
}

function App() {
  const [user, setUser] = useState(null);
  const {
    signIn: firebaseSignIn
  } = useFirebaseAuth(setUser);
  useGoogleAuth(setUser);

  return (
    <div className="App">
      {user ?
        <p>{user}</p>
        : <button onClick={firebaseSignIn}>Sign In</button>}
    </div>
  );
}

export default App;
