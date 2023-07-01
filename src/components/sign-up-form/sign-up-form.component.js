import { useContext, useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase.utils';

import './sign-up-form.styles.js';
import { UserContext } from '../../context/user.context';
import { SignUpContainer } from './sign-up-form.styles.js';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user);

            await createUserDocumentFromAuth(user, { displayName });

            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <h1>Sign up with your email and password</h1>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type='text'
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                    required
                />

                <FormInput
                    label='Email'
                    type='email'
                    onChange={handleChange}
                    name='email'
                    value={email}
                    required
                />

                <FormInput
                    label='Password'
                    type='password'
                    onChange={handleChange}
                    name='password'
                    value={password}
                    required
                />

                <FormInput
                    label='Confirm Password'
                    type='password'
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                    required
                />

                <Button type='submit' onChange={handleChange}>
                    Sign Up
                </Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;
