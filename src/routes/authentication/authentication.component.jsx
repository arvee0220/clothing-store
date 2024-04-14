import SignUpForm from "../../components/sign-up/sign-up-form.component";
import SignInForm from "../../components/sign-in/sign-in-form.component";

const Authentication = () => {
    return (
        <div>
            <h1>Sign In Page</h1>

            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;
