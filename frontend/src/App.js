import { useEffect, useState } from 'react';
import './App.css';
import { auth, provider } from './firebase';
import { getRedirectResult, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const getUserDetails = useEffect(() => {
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
        // ...
      });
  }, []);
  const signIn = () => signInWithRedirect(auth, provider);

  return (
    <div className="App">
      {user ?
        <p>{user}</p>
        : <button onClick={signIn}>Sign In</button>}
    </div>
  );
}

export default App;
