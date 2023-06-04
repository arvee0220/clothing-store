import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

// Firebase url link for SDK https://console.firebase.google.com/u/0/project/clothing-store-438c4/overview
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKQ9uAMfS_QroZUZJn1QgxcqMBVw5FkmY",
    authDomain: "clothing-store-438c4.firebaseapp.com",
    projectId: "clothing-store-438c4",
    storageBucket: "clothing-store-438c4.appspot.com",
    messagingSenderId: "707624724613",
    appId: "1:707624724613:web:4c053bac627cfdfd9121ec",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
