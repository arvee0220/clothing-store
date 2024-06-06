import ButtonSpinner from "./button-spinner.component";
import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
	google: "button-container google-sign-in",
	inverted: "button-container inverted",
	default: "button-container",
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    return (
        <button
            disabled={isLoading}
            className={`${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps}
        >
            {isLoading ? <ButtonSpinner /> : children}
        </button>
    );
};

export default Button;
