import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD5LZwhRx3DkP1_iwiPE9sVEL9h0mBaVvo",
  authDomain: "whatsapp-clone-15f68.firebaseapp.com",
  projectId: "whatsapp-clone-15f68",
  storageBucket: "whatsapp-clone-15f68.appspot.com",
  messagingSenderId: "58264370321",
  appId: "1:58264370321:web:442170a2552c8c6a96d330",
  measurementId: "G-V79RVRH2L8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db; 
