import { FC, ButtonHTMLAttributes } from "react";
import ButtonSpinner from "./button-spinner.component";
import "./button.styles.scss";

export const BUTTON_TYPE_CLASSES = {
	google: "button-container google-sign-in",
	inverted: "button-container inverted",
	default: "button-container",
} as const;

export type ButtonProps = {
	buttonType?: keyof typeof BUTTON_TYPE_CLASSES;
	isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
	children,
	buttonType = BUTTON_TYPE_CLASSES.default,
	isLoading,
	...otherProps
}) => {
	const buttonClass = buttonType
		? `button-container ${BUTTON_TYPE_CLASSES[buttonType as keyof typeof BUTTON_TYPE_CLASSES]}`
		: "button-container";
	return (
		<button className={buttonClass} {...otherProps}>
			{isLoading ? <ButtonSpinner /> : children}
		</button>
	);
};

export default Button;
