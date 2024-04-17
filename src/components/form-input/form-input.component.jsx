import PropTypes from "prop-types";
import "./form-input.styles.scss";

// Component for SignIn and SignUp form
const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="group">
            <input {...otherProps} className="form-input" />
            {label && (
                <label
                    className={`${
                        otherProps.value.length ? "shrink" : ""
                    } form-input-label`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
};

export default FormInput;
