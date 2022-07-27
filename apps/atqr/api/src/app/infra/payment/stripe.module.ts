import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  imports: [ConfigModule],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
