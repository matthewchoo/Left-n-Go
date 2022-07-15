import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, 
    signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged
    , updateEmail,  
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword} from "firebase/auth";
import { auth, useAuth } from "./useAuth";
import { useEffect, useState } from "react";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";

const googleAuthProvider = new GoogleAuthProvider();
const gitHubAuthProvider = new GithubAuthProvider();

const saveItem = async (id, data) => {
    await setDoc(doc(firestore, "users", id), data, { 
      merge : true 
    });
};

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
    const [ user, setUser ] = useState(null);
    const { dispatch } = useAuth()
    const [ error, setError ] = useState(null)

    //const { documents: users } = useCollection('users', ['uid', '==', user.id])
    //const docRef = doc(firestore, 'users', user.uid)
  
    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password) => {
        setError(null)
        // let uType = ''
        
        signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            //to fetch uid here. If userType == null, set userType here
            setUser(response.user)
            const docRef = doc(firestore, 'users', response.user.uid)
            // console.log(response.user.uid)

            getDoc(docRef).then((snapshot) => {
                // uType = snapshot.data().userType
                // console.log("uType 1: ", uType)
                dispatch({ type: 'LOGIN', payload: response.user, userType: snapshot.data().userType })
                // console.log(result.userType)
            })   
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
            const data = {
                uid : response.user.uid,
                email : response.user.email,
                userType : userType,
            }
            saveItem(response.user.uid, data)
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
            dispatch({ type: 'LOGIN', payload: response.user, userType: "Cust" })
            setUser(response.user)
            const data = {
                uid : response.user.uid,
                email : response.user.email,
                userType : "Cust",
            }
            saveItem(response.user.uid, data)
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
            dispatch({ type: 'LOGIN', payload: response.user, userType: "Cust" })
            setUser(response.user)
        })
        .catch((err) => {
            setError(err.message)
        })
        
        return { error, signInWithGitHub }

    //   return signInWithPopup(auth, gitHubAuthProvider);
    }

    const changeEmail = (newEmail) => {
        setError(null)
        updateEmail(auth.currentUser, newEmail)
            .then((response) => {
                setUser(response.user)
                // collection(firestore, 'users').doc(response.user.uid).update({
                //     email: newEmail
                // })
            })
            .catch((err) => {
                setError(err.message)
            })
        
            return { error, changeEmail }
    }

    const changePassword = (newPassword) => {
      setError(null)
      updatePassword(auth.currentUser, newPassword)
        .then((response) => {
          setUser(response.user)
        })
        .catch((err) => {
          setError(err.message)
        })

      return { error, changePassword }
    }
  
    const reauthenticate = (password) => {
      setError(null)
      const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          password
      )
      
      // console.log(credential)

      reauthenticateWithCredential(
          auth.currentUser,
          credential
      ).then((response) => {
        setUser(response.user)
        const docRef = doc(firestore, 'users', response.user.uid)
        // console.log(response.user.uid)

        getDoc(docRef).then((snapshot) => {
            dispatch({ type: 'LOGIN', payload: response.user, userType: snapshot.data().userType })
        })
          // console.log("re-auth success")
      }).catch((err) => {
          setError(err.message)
      })

      return { error, reauthenticate }
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
      changeEmail,
      changePassword,
      reauthenticate
    };
  }