import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../context/user.context';

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>

            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    inputOptions={{
                        type: 'email',
                        onChange: handleChange,
                        name: 'email',
                        value: email,
                        required: true,
                    }}
                />

                <FormInput
                    label='Password'
                    inputOptions={{
                        type: 'password',
                        onChange: handleChange,
                        name: 'password',
                        value: password,
                        required: true,
                    }}
                />

                <div className='buttons-container'>
                    <Button
                        buttonType='inverted'
                        type='submit'
                        onChange={handleChange}
                    >
                        Sign In
                    </Button>
                    <Button
                        buttonType='google'
                        type='button'
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
