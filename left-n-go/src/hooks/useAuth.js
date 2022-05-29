// Comments
// import * as firebase from "firebase/app"; for firebase 8
// import "firebase/auth"; for firebase 8

// TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   //...
// };
// Add your Firebase credentials
// firebase.initializeApp({
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   appID: "",
// });
//the above part is already in firebaseConfig in ../config/firebaseConfig
import React, { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../config/firebaseConfig";
// import ( firebaseConfig ) from "../config/firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, 
    signOut,  } from "firebase/auth";

    // signInWithEmailAndPassword, createUserWithEmailAndPassword, 
    // sendPasswordResetEmail, confirmPasswordReset

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//Initialize Firebase Auth for google auth
//const firebaseAuth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();
const gitHubAuthProvider = new GithubAuthProvider();

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });

    //   Firebase9 code
    //   return signInWithEmailAndPassword(auth, email, password)
    //   .then((response) => {
    //     setUser(response.user);
    //     return response.user;
    //   });
  };
  const signup = (email, password) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };
//   const signout = () => {
//     return auth
//       .signOut()
//       .then(() => {
//         setUser(false);
//       });
//   };
  const signout = () => {
    return signOut(auth);
  };
  const sendPasswordResetEmail = (email) => {
    return auth
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };
  const confirmPasswordReset = (code, password) => {
    return auth
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  //created a const for signInWithGoogle
  const signInWithGoogle = () => {
      return signInWithPopup(auth, googleAuthProvider);
  }

  const signInWithGitHub = () => {
    return signInWithPopup(auth, gitHubAuthProvider);
  }

//   const signOut = () => {
//     return signOut(auth);
//   }

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    signInWithGoogle,
    signInWithGitHub,
  };
}

//Steps to doing auth 
//1. Instantiate, import the required objects (follow firebase docs)
//2. Create a const for signInWithProvider (Eg, signInWithGoogle)
//3. Include the const in the return statement
//4. Import the signIn in the signIn page