import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
} from "../../utils/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    );
};

export default SignIn;
