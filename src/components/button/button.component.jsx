import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
    google: "button-container google-sign-in",
    inverted: "button-container inverted",
    default: "button-container",
};

const Button = ({ children, buttonType, ...otherProps }) => {
    return (
        <button
            className={`${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;
