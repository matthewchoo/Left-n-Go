// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// export const firebaseConfig = {
//   apiKey: "AIzaSyCRXOXAINAqQA8uejRiwKQ7S0kWjAM-j8U",
//   authDomain: "left-n-go-1.firebaseapp.com",
//   projectId: "left-n-go-1",
//   storageBucket: "left-n-go-1.appspot.com",
//   messagingSenderId: "1057582981803",
//   appId: "1:1057582981803:web:9cfa1ea847aeb12adf0dee"
// };

import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCgNmHXJorJ3s7welJS5Cx25dTokn0kKco",
  authDomain: "left-n-go.firebaseapp.com",
  databaseURL: "https://left-n-go-default-rtdb.firebaseio.com",
  projectId: "left-n-go",
  storageBucket: "left-n-go.appspot.com",
  messagingSenderId: "932667893902",
  appId: "1:932667893902:web:a1ddebc74ec1dd2cc3c1df"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };

// Initialize Firebase
//const app = initializeApp(firebaseConfig);