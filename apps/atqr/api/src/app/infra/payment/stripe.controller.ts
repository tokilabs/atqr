import { Controller, Get, Headers, HttpCode, Post } from '@nestjs/common';
import Stripe from 'stripe';
import { RawBody } from '../../../utils/decorators/rawBody.decorator';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  private endpointSecret =
    'whsec_fea9e7f1f14a57c5787145cc819decf2c9cbbf7e5889400e2e5fe25e4577eba7';
  constructor(private readonly stripeService: StripeService) {}

  @Get('public-key')
  getPublicKey(): string {
    return this.stripeService.publicKey;
  }

  @Post('setup-intent')
  async createSetupIntent() {
    return await this.stripeService.createSetupIntent();
  }

  @Post('webhook')
  webhook(
    // Get the signature sent by Stripe
    @Headers('stripe-signature') signature: string,
    // Stripe expects a raw event, so don't hydrate it
    @RawBody() rawEvent
  ) {
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    let event: Stripe.Event;
    if (this.endpointSecret) {
      try {
        event = this.stripeService.constructEvent(rawEvent, signature);
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return HttpCode(400);
      }
    }
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;

          console.log(
            `PaymentIntent for ${paymentIntent.amount} was successful!`
          );
          this.stripeService.handlePaymentIntentSucceeded(paymentIntent);
        }
        // Then define and call a method to handle the successful payment intent.
        break;
      case 'payment_method.attached':
        {
          const paymentMethod = event.data.object as Stripe.PaymentMethod;
          this.stripeService.handlePaymentMethodAttached(paymentMethod);
        }
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    return;
  }
}
