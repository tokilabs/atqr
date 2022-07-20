import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';


@Injectable()
export class StripeService implements OnApplicationBootstrap {
  private processor: Stripe;
  private apiKey: string;
  constructor(private readonly configService: ConfigService) {}

  onApplicationBootstrap() {
    this.apiKey = this.configService.get<string>('STRIPE_API_KEY');
    this.processor = new Stripe(this.apiKey, {
      apiVersion: '2020-08-27',
    });
  }
}
