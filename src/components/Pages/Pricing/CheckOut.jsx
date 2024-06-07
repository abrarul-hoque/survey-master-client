import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";
import useSurveyor from "../../../hooks/useSurveyor";
import useProUser from "../../../hooks/useProUser";

const CheckOut = () => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const navigate = useNavigate();
    const totalPrice = 75;
    const [isAdmin] = useAdmin();
    const [isSurveyor] = useSurveyor();
    const [isProUser] = useProUser();

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log("Payment error", error);
            setError(error.message);

        }
        else {
            console.log("payment Method", paymentMethod);
            setError("");
        }

        //confirm payment:
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment((clientSecret), {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })
        if (confirmError) {
            console.log("confirm Error")
        }
        else {
            console.log("Payment Intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log("Transaction Id: ", paymentIntent.id);
                setTransactionId(paymentIntent.id);

                //save the payment infor in database
                const payment = {
                    name: user?.name,
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date().toLocaleString(),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log("payment saved", res.data);

                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for Payment.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770', '::placeholder': { color: '#9a2146' },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                <div className="flex justify-center mt-6">
                    <button
                        className='btn btn-primary'
                        type='submit'
                        disabled={!stripe || !clientSecret || isProUser || isSurveyor || isAdmin}
                    >
                        Pay
                    </button>
                </div>
            </form>
            <p className="text-red-400 my-5 text-center">{error}</p>

            {transactionId && <p className="text-green-600 text-center">Payment Successful! <br /> Your Transaction id: {transactionId}</p>}
        </div>
    );
};

export default CheckOut;