import { Challenge, PaymentEntity } from '@atqr/domain';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService implements OnApplicationBootstrap {
  private stripeClient: Stripe;

  constructor(private readonly configService: ConfigService) {}

  onApplicationBootstrap() {
    const apiKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    this.stripeClient = new Stripe(apiKey, {
      apiVersion: '2020-08-27',
    });
  }

  get publicKey() {
    return this.configService.get<string>('STRIPE_PUBLIC_KEY');
  }

  get endpointSecret() {
    return this.configService.get<string>('STRIPE_WEBHOOK_ENDPOINT_SECRET');
  }

  async retrieveCustomer(
    paymentEntity: PaymentEntity
  ): Promise<Stripe.Response<Stripe.Customer>> {
    const customer = await this.stripeClient.customers.retrieve(
      paymentEntity.customerId.toString()
    );

    if (customer.deleted) {
      throw new Error('User was deleted');
    }

    return customer as Stripe.Response<Stripe.Customer>;
  }

  async getPaymentMethod(
    paymentEntity: PaymentEntity
  ): Promise<Stripe.PaymentMethod> {
    const paymentMethods = await this.stripeClient.paymentMethods.list({
      customer: paymentEntity.customerId.toString(),
      type: 'card',
    });
    return paymentMethods.data[0];
  }

  async createSetupIntent(
    challengedId?: string
  ): Promise<Stripe.Response<Stripe.SetupIntent>> {
    const customer = await this.stripeClient.customers.create(
      challengedId && {
        metadata: {
          challengedId,
        },
      }
    );

    return await this.stripeClient.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
    });
  }

  // Done: Provide parameter type
  async chargeCard(challenge: Challenge) {
    // Done: Define Payment intent and Customer Types
    let paymentEntity: PaymentEntity;
    let paymentIntent: Stripe.PaymentIntent;
    try {
      // You need to attach the PaymentMethod to a Customer in order to reuse
      // Since we are using test cards, create a new Customer here
      // You would do this in your payment flow that saves cards

      let customer = await this.retrieveCustomer(paymentEntity); //and???;
      // : Stripe.Customer;

      // List the customer's payment methods to find one to charge
      const paymentMethod = await this.getPaymentMethod(
        challenge.player.paymentEntity
      );
      // Create and confirm a PaymentIntent with the order amount, currency,
      // Customer and PaymentMethod ID

      paymentIntent = await this.createPaymentIntent(
        customer,
        paymentMethod,
        challenge.price, // Done: Get value from challenge,
        false
      );

      return {
        succeeded: true,
        clientSecret: paymentIntent.client_secret,
        publicKey: this.publicKey,
      };
    } catch (err) {
      if (err.code === 'authentication_required') {
        // Bring the customer back on-session to authenticate the purchase
        // You can do this by sending an email or app notification to let them know
        // the off-session purchase failed
        // Use the PM ID and client_secret to authenticate the purchase
        // without asking your customers to re-enter their details
        return {
          error: 'authentication_required',
          paymentMethod: err.raw.payment_method.id,
          clientSecret: err.raw.payment_intent.client_secret,
          publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
          amount: challenge.price, // DONE: Get value from challenge
          card: {
            brand: err.raw.payment_method.card.brand,
            last4: err.raw.payment_method.card.last4,
          },
        };
      } else if (err.code) {
        // The card was declined for other reasons (e.g. insufficient funds)
        // Bring the customer back on-session to ask them for a new payment method
        return {
          error: err.code,
          clientSecret: err.raw.payment_intent.client_secret,
          publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
        };
      } else {
        console.log('Unknown error occurred', err);
      }
    }
    return;
  }

  // Done: Provide parameter type
  async verifyFunds(challenge: Challenge) {
    // Done: Define Payment intent and Customer Types
    let paymentEntity: PaymentEntity;
    let paymentIntent: Stripe.PaymentIntent, customer: Stripe.Customer;
    try {
      // You need to attach the PaymentMethod to a Customer in order to reuse
      // Since we are using test cards, create a new Customer here
      // You would do this in your payment flow that saves cards
      customer = await this.retrieveCustomer(paymentEntity);

      // List the customer's payment methods to find one to charge
      const paymentMethod = await this.getPaymentMethod(
        challenge.player.paymentEntity
      );

      // Create and confirm a PaymentIntent with the order amount, currency,
      // Customer and PaymentMethod ID

      paymentIntent = await this.createPaymentIntent(
        customer,
        paymentMethod,
        challenge.price, // Done: Get value from challenge
        false
      );

      return {
        succeeded: true,
        clientSecret: paymentIntent.client_secret,
        publicKey: this.publicKey,
      };
    } catch (err) {
      if (err.code === 'authentication_required') {
        // Bring the customer back on-session to authenticate the purchase
        // You can do this by sending an email or app notification to let them know
        // the off-session purchase failed
        // Use the PM ID and client_secret to authenticate the purchase
        // without asking your customers to re-enter their details
        return {
          error: 'authentication_required',
          paymentMethod: err.raw.payment_method.id,
          clientSecret: err.raw.payment_intent.client_secret,
          publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
          amount: challenge.price, // Done: Get value from challenge
          card: {
            brand: err.raw.payment_method.card.brand,
            last4: err.raw.payment_method.card.last4,
          },
        };
      } else if (err.code) {
        // The card was declined for other reasons (e.g. insufficient funds)
        // Bring the customer back on-session to ask them for a new payment method
        return {
          error: err.code,
          clientSecret: err.raw.payment_intent.client_secret,
          publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
        };
      } else {
        console.log('Unknown error occurred', err);
      }
    }
  }

  private async createPaymentIntent(
    customer: Stripe.Customer,
    paymentMethod: Stripe.PaymentMethod,
    amount: number,
    confirm = false
  ): Promise<Stripe.PaymentIntent> {
    return await this.stripeClient.paymentIntents.create({
      amount,
      currency: 'brl',
      payment_method: paymentMethod.id,
      customer: customer.id,
      off_session: true,
      confirm,
    });
  }

  constructEvent(evtBody, signature): Stripe.Event {
    console.log('Constructing Event');
    return this.stripeClient.webhooks.constructEvent(
      evtBody,
      signature,
      this.endpointSecret
    );
  }

  // Todo: Implement webhoook method:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
    throw new Error('Method not implemented.');
  }

  // Todo: Implement webhoook method:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handlePaymentMethodAttached(paymentMethod: Stripe.PaymentMethod) {
    throw new Error('Method not implemented.');
  }
}
