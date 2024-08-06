import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAY2-1gBWEHSoFB6xns-TlrOGfuugBwG74",
    authDomain: "auth-confessionity.firebaseapp.com",
    projectId: "auth-confessionity",
    storageBucket: "auth-confessionity.appspot.com",
    messagingSenderId: "517702057162",
    appId: "1:517702057162:web:65ac380f91dd74b9b64833",
    measurementId: "G-TFNYZH3T3D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const provider = new GoogleAuthProvider();