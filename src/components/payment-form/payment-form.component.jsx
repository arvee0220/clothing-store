import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button from "../button/button.component";

import "./payment-form.styles.scss";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const response = await fetch(
            "/.netlify/functions/create-payment-intent",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: 10000 }),
            }
        ).then((res) => res.json());

        const {
            paymentIntent: { client_secret },
        } = response;

        console.log(client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "arvee",
                },
            },
        });

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === "succeeded") {
                alert("Payment Successful");
            }
        }
    };

    return (
        <div className="payment-form-container">
            <form onSubmit={paymentHandler} className="form-container">
                <h2>Credi Card Payment: </h2>
                <CardElement />
                <Button buttonType="inverted">Pay Now</Button>
            </form>
        </div>
    );
};

export default PaymentForm;
