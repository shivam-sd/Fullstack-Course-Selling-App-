import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51QlP7gLWH3EY92wpbIqAeHrkhNaisJ1LyGJtOzQ2Wv5x9vS7b4PSTtNoxJPDgjGvxcL9ALGFtwWM27ziW6OI3gXl00aN9E5ZI1"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);
