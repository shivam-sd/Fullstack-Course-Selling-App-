import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const BuyCourse = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [cardError, setCardError] = useState("");

  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!token) {
        toast.error("Please login to purchase the course.");
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_SIGNUP_API}/courses/buy/${courseId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setCourse(data.course);
        setClientSecret(data.clientSecret);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err.response?.status === 400) {
          setError("You have already purchased this course.");
          navigate("/purchases");
        } else {
          setError(err.response?.data?.errors || "Something went wrong.");
        }
      }
    };

    fetchCourseData();
  }, [courseId, navigate, token]);

  const handlePurchase = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or Elements not found.");
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      console.log("Card Element not found.");
      return;
    }

    setLoading(true);
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      console.log("Stripe Payment Method error", paymentMethodError);
      setCardError(paymentMethodError.message);
      setLoading(false);
      return;
    }

    if (!clientSecret) {
      console.log("Client secret not found.");
      setLoading(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: token?.user?.firstName,
          email: token?.user?.email,
        },
      },
    });

    if (confirmError) {
      console.log("Payment confirmation error", confirmError);
      setCardError(confirmError.message);
      // const paymentInfo = {
      //   userid: user.user._id,
      //   email: user?.user?.email,
      //   courseid: courseId,
      //   payment: paymentIntent.id,
      //   amount: paymentIntent.amount,
      //   status: paymentIntent.status,
      // };
      // console.log("Payment Sucessfull:-", paymentInfo);
    } else if (paymentIntent?.status === "succeeded") {
      console.log("Payment succeeded: ", paymentIntent);
      setCardError("your payment id: ", paymentIntent.id);
      const paymentInfo = {
        email: token?.user?.email,
        userId: token?.user?.id,
        courseId: courseId,
        paymentId: paymentIntent?.id,
        amount: paymentIntent?.amount,
        status: paymentIntent?.status,
      }; 
      console.log("Payment Info",paymentInfo);
     
await axios.post(`${import.meta.env.VITE_SIGNUP_API}/order/` , paymentInfo , {
  headers:{
    Authorization: `Bearer ${token}`
  }
}).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.log(error);
  toast.error("error in payment making");
})

      toast.success("Payment Successful!");
      navigate("/purchases");
    }

    setLoading(false);
  };

  return (
    <>
      {error ? (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg">
            <p className="text-lg font-semibold">{error}</p>
            <Link
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200 mt-3 flex items-center justify-center"
              to="/purchases"
            >
              Purchases
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row my-40 container mx-auto">
          <div className="w-full md:w-1/2">
            <h1 className="text-xl font-semibold underline">Order Details</h1>
            <div className="flex items-center text-center space-x-2 mt-4">
              <h2 className="text-gray-600 text-sm">Total Price</h2>
              <p className="text-red-500 font-bold">${course.price}</p>
            </div>
            <div className="flex items-center text-center space-x-2">
              <h1 className="text-gray-600 text-sm">Course Name</h1>
              <p className="text-red-500 font-bold">{course.title}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">Process your Payment!</h2>
              <form onSubmit={handlePurchase}>
                <label className="block text-gray-700 text-sm mb-2" htmlFor="card-number">
                  Credit/Debit Card
                </label>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
                <button
                  type="submit"
                  disabled={!stripe || loading}
                  className="mt-8 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
                >
                  {loading ? "Processing..." : "Pay"}
                </button>
              </form>
              {cardError && <p className="text-red-500 font-semibold text-xs">{cardError}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyCourse;
