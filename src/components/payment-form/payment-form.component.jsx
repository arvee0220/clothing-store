import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import Button from "../button/button.component";

import "./payment-form.styles.scss";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        try {
            const response = await fetch(
                "/.netlify/functions/create-payment-intent",
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ amount: amount * 100 }),
                }
            );

            const resData = await response.json();

            const {
                paymentIntent: { client_secret },
            } = resData;

            console.log(client_secret);

            const paymentResult = await stripe.confirmCardPayment(
                client_secret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: currentUser
                                ? currentUser.displayName
                                : "Guest",
                        },
                    },
                }
            );

            setIsProcessingPayment(false);

            if (paymentResult.error) {
                alert(paymentResult.error);
            } else {
                if (paymentResult.paymentIntent.status === "succeeded") {
                    alert("Payment Successful");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred during the payment process.");
        }
    };

    return (
        <div className="payment-form-container">
            <form onSubmit={paymentHandler} className="form-container">
                <h2>Credi Card Payment: </h2>
                <CardElement />
                <Button isLoading={isProcessingPayment} buttonType="inverted">
                    Pay Now
                </Button>
            </form>
        </div>
    );
};

export default PaymentForm;
