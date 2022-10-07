import { atqrApi } from '../../services/api';

declare const Stripe: Awaited<
  ReturnType<typeof import('@stripe/stripe-js').loadStripe>
>;

const stripePublicKey = atqrApi.payment.publicKey().then((data) => data);

const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const options = {
  clientSecret: '{{CLIENT_SECRET}}',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

// Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
const elements = stripe.elements(options);

// Create and mount the Payment Element
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');
