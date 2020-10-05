import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDuN7gHLhAiRGxZkycmtLb37-3Abx2DZo",
  authDomain: "mitwort-f1626.firebaseapp.com",
  databaseURL: "https://mitwort-f1626.firebaseio.com",
  projectId: "mitwort-f1626",
  storageBucket: "mitwort-f1626.appspot.com",
  messagingSenderId: "763244278348",
  appId: "1:763244278348:web:4a278cd052bc9def6bfae9",
  measurementId: "G-LNP1ZFN9YV",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
