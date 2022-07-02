import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly configService: ConfigService
  ) {}

  @Get('/stripe-key')
  getPublicKey(): string {
    return this.stripeService.publicKey;
  }

  @Post('create-setup-intent')
  async createSetupIntent() {
    return await this.stripeService.createSetupIntent();
  }

  @Post('webhook')
  webhook() {
    // TODO: Implement
  }
}
