import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
} from '../../utils/firebase.utils';
import SignInForm from '../sign-in-form/sign-in-form.component';
import SignUpForm from '../sign-up-form/sign-up-form.component';

const Authentication = () => {
    return (
        <div className='sign-up-container'>
            <h1>Sign In Page</h1>
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;
