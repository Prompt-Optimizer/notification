import { Controller, UseInterceptors } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import type { WelcomeEmailEvent } from '@prompt-optimizer/common-lib/notification-events';
import type { OptimizationSuccessEmailEvent } from '@prompt-optimizer/common-lib/notification-events';
import type { OptimizationErrorEmailEvent } from '@prompt-optimizer/common-lib/notification-events';
import { RmqAckInterceptor } from '@prompt-optimizer/common-lib/rmq';

import { ROUTING_KEYS } from '../constants';
import { WelcomeEmailHandler, OptimizationSuccessEmailHandler, OptimizationErrorEmailHandler } from '../handlers';

@UseInterceptors(RmqAckInterceptor)
@Controller()
export class EmailRmqController {
  constructor(
    private readonly welcomeEmailHandler: WelcomeEmailHandler,
    private readonly optimizationSuccessEmailHandler: OptimizationSuccessEmailHandler,
    private readonly optimizationErrorEmailHandler: OptimizationErrorEmailHandler,
  ) {}

  @EventPattern(ROUTING_KEYS.EMAIL_WELCOME)
  async handleWelcome(@Payload() event: WelcomeEmailEvent): Promise<void> {
    await this.welcomeEmailHandler.execute(event);
  }

  @EventPattern(ROUTING_KEYS.EMAIL_OPTIMIZATION_SUCCESS)
  async handleOptimizationSuccess(@Payload() event: OptimizationSuccessEmailEvent): Promise<void> {
    await this.optimizationSuccessEmailHandler.execute(event);
  }

  @EventPattern(ROUTING_KEYS.EMAIL_OPTIMIZATION_ERROR)
  async handleOptimizationError(@Payload() event: OptimizationErrorEmailEvent): Promise<void> {
    await this.optimizationErrorEmailHandler.execute(event);
  }
}
