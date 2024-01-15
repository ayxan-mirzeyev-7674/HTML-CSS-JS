import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import { initializeApp as firebase } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { getFirestore, limit } from "firebase/firestore";
import { collection, doc, setDoc, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB20Zr8eiS3u0gBViOEmSF1UNq9T5F4Qdw",
  authDomain: "chat-app-fe2a6.firebaseapp.com",
  projectId: "chat-app-fe2a6",
  storageBucket: "chat-app-fe2a6.appspot.com",
  messagingSenderId: "462530898351",
  appId: "1:462530898351:web:df9cb11d7f2fe9b0b2a75a",
  measurementId: "G-5SWQW24ZLC",
};

const app = firebase(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getRedirectResult(auth)
      .then((response) => {
        if (!response) return;

        // Your code here
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const user = auth.currentUser;

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        className="sign-out"
        onClick={() => {
          auth.signOut();
          window.location.reload();
        }}
      >
        Sign Out
      </button>
    )
  );
}
function ChatRoom() {
  const dummy = useRef();
  const messagesRef = collection(db, 'messages');
  console.log(messagesRef)
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });


  return (
    <>
      <div>
        {messages && messages.docs.map((msg) => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
      <div>da</div>
    </>
  );
}

function SignIn() {
  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return <button onClick={SignInWithGoogle}>Sign in with Google</button>;
}

export default App;
