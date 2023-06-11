import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
    getFirestore,
    indexedDBLocalPersistence,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

// Firebase url link for SDK https://console.firebase.google.com/u/0/project/clothing-store-438c4/overview
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDKQ9uAMfS_QroZUZJn1QgxcqMBVw5FkmY',
    authDomain: 'clothing-store-438c4.firebaseapp.com',
    projectId: 'clothing-store-438c4',
    storageBucket: 'clothing-store-438c4.appspot.com',
    messagingSenderId: '707624724613',
    appId: '1:707624724613:web:4c053bac627cfdfd9121ec',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;
    // if !user data
    // create / set the document with the data from userAuth in my collection

    // check if user data exists

    // if

    // return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};
