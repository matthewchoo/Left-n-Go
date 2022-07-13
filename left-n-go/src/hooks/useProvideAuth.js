import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, 
    signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { auth, useAuth } from "./useAuth";
import { useEffect, useState } from "react";

const googleAuthProvider = new GoogleAuthProvider();
const gitHubAuthProvider = new GithubAuthProvider();

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
    const [ user, setUser ] = useState(null);
    const { dispatch } = useAuth()
    const [ error, setError ] = useState(null)
  
    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password, userType) => {
        setError(null)
        signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            dispatch({ type: 'LOGIN', payload: response.user, userType })
            setUser(response.user)
        })
        .catch((err) => {
            // setError(err.code)
            setError(err.message)
        })

        return { error, signin }

        // Firebase9 code
    //   return signInWithEmailAndPassword(auth, email, password)
      
    };
    const signup = (email, password, userType) => {
        setError(null)
        createUserWithEmailAndPassword(auth, email, password)
          .then((response) => {
            // dispatch({ type: 'LOGIN', payload: response.user, userType: "User" })
            dispatch({ type: 'LOGIN', payload: response.user, userType: userType })
            setUser(response.user)
          })
          .catch((err) => {
            setError(err.message)
          })
    
        return { error, signin }
    //   return createUserWithEmailAndPassword(auth, email, password)
    };
  
    const signout = () => {
        setError(null)

        signOut(auth)
        .then(() => {
            dispatch({ type: 'LOGOUT' })
        }).catch((err) => {
            setError(err.message)
        })

        return { error, signout }
    //   return signOut(auth);
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
        setError(null)

        signInWithPopup(auth, googleAuthProvider)
        .then((response) => {
            dispatch({ type: 'LOGIN', payload: response.user, userType: "User" })
            setUser(response.user)
        })
        .catch((err) => {
            setError(err.message)
        })
        
        return { error, signInWithGoogle }

        // return signInWithPopup(auth, googleAuthProvider);
    }
  
    const signInWithGitHub = () => {
        setError(null)

        signInWithPopup(auth, gitHubAuthProvider)
        .then((response) => {
            dispatch({ type: 'LOGIN', payload: response.user, userType: "User" })
            setUser(response.user)
        })
        .catch((err) => {
            setError(err.message)
        })
        
        return { error, signInWithGitHub }

    //   return signInWithPopup(auth, gitHubAuthProvider);
    }
  
    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
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
      error,
      signin,
      signup,
      signout,
      sendPasswordResetEmail,
      confirmPasswordReset,
      signInWithGoogle,
      signInWithGitHub,
    };
  }