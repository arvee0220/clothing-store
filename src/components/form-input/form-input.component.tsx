import React, { FC, InputHTMLAttributes } from "react";
import "./form-input.styles.scss";

type FormInputProps = {
	label: string;
} & InputHTMLAttributes<HTMLInputElement>;

// Component for SignIn and SignUp form
const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
	return (
		<div className="group">
			<input {...otherProps} className="form-input" />
			{label && (
				<label
					className={`${
						otherProps.value && otherProps.value.toString().length ? "shrink" : ""
					} form-input-label`}
				>
					{label}
				</label>
			)}
		</div>
	);
};

export default FormInput;
