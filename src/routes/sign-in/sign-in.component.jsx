import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up/sign-up-form.component";

const SignIn = () => {
    const logGooglePopup = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);

        return userDocRef;
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGooglePopup}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;
