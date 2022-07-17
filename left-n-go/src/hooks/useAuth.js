import React, { useEffect, useContext, createContext, useReducer, useRef } from "react";
import { initializeApp } from 'firebase/app';
import { firebaseConfig, firestore } from "../config/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useMemo } from "react";
// import ( firebaseConfig ) from "../config/firebaseConfig";
// import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, 
//     signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//Initialize Firebase Auth for google auth
// const googleAuthProvider = new GoogleAuthProvider();
// const gitHubAuthProvider = new GithubAuthProvider();

const authContext = createContext();

export const authReducer = (state, action) => {
  switch(action.type) {
      case 'LOGIN':
          return { ...state, user: action.payload, userType: action.userType }
      
      case 'LOGOUT': 
          return { ...state, user: null, userType: null }
      
      case 'AUTH_IS_READY':
          return { ...state, user: action.payload, authIsReady: true, userType: action.userType }
      
      default:
          return state
  }
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  // const _auth = useProvideAuth();

  const [ state, dispatch ] = useReducer(authReducer, {
    user: null, 
    authIsReady: false,
    userType: null,
  })

  useEffect(() => {
      const unsub = onAuthStateChanged(auth, user => {

        //if there is a user, fetch the userType
        if (user) {
          const docRef = doc(firestore, 'users', user.uid)

            getDoc(docRef).then((snapshot) => {
                dispatch({ type: 'AUTH_IS_READY', payload: user, userType: snapshot.data().userType })
                console.log("userType: ", snapshot.data().userType)
            })
        } else {
          //else, dispatch as normal
          dispatch({ type: 'AUTH_IS_READY', payload: user })
        }
          unsub()
      })
  }, [])

// console.log('AuthContext state: ', _auth )

console.log('AuthContext state: ', state)
// console.log("User: ", state.user)

// window.localStorage.setItem("USER_STORAGE", JSON.stringify(state))
// console.log('AuthContext userType: ', state.userType)

  return <authContext.Provider value={{ ...state, dispatch }}>{children}</authContext.Provider>;
}

export const ProvidesAuth = React.memo(ProvideAuth);

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// // Provider hook that creates auth object and handles state
// function useProvideAuth() {
//   const [user, setUser] = useState(null);

//   // Wrap any Firebase methods we want to use making sure ...
//   // ... to save the user to state.
//   const signin = (email, password) => {
//     // return auth
//     //   .signInWithEmailAndPassword(email, password)
//     //   .then((response) => {
//     //     setUser(response.user);
//     //     return response.user;
//     //   });

//       // Firebase9 code
//     return signInWithEmailAndPassword(auth, email, password)
    
//   };
//   const signup = (email, password) => {
//     // return auth
//     //   .createUserWithEmailAndPassword(email, password)
//     //   .then((response) => {
//     //     setUser(response.user);
//     //     return response.user;
//     //   });
//     return createUserWithEmailAndPassword(auth, email, password)
//   };

//   const signout = () => {
//     return signOut(auth);
//   };
//   const sendPasswordResetEmail = (email) => {
//     return auth
//       .sendPasswordResetEmail(email)
//       .then(() => {
//         return true;
//       });
//   };
//   const confirmPasswordReset = (code, password) => {
//     return auth
//       .confirmPasswordReset(code, password)
//       .then(() => {
//         return true;
//       });
//   };

//   //created a const for signInWithGoogle
//   const signInWithGoogle = () => {
//       return signInWithPopup(auth, googleAuthProvider);
//   }

//   const signInWithGitHub = () => {
//     return signInWithPopup(auth, gitHubAuthProvider);
//   }

//   // Subscribe to user on mount
//   // Because this sets state in the callback it will cause any ...
//   // ... component that utilizes this hook to re-render with the ...
//   // ... latest auth object.
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(false);
//       }
//     });
//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);
//   // Return the user object and auth methods
//   return {
//     user,
//     signin,
//     signup,
//     signout,
//     sendPasswordResetEmail,
//     confirmPasswordReset,
//     signInWithGoogle,
//     signInWithGitHub,
//   };
// }

//Steps to doing auth 
//1. Instantiate, import the required objects (follow firebase docs)
//2. Create a const for signInWithProvider (Eg, signInWithGoogle)
//3. Include the const in the return statement
//4. Import the signIn in the signIn page