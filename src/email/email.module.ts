import { Module } from '@nestjs/common';
import { RmqTopologyModule } from '@prompt-optimizer/common-lib/rmq-topology';

import { ConfigModule, ConfigService } from '@app/config';

import { ROUTING_KEYS } from './constants';
import { WelcomeEmailHandler, OptimizationSuccessEmailHandler, OptimizationErrorEmailHandler } from './handlers';
import { BrevoEmailProvider } from './infrastructure';
import { EMAIL_PROVIDER } from '@app/email/services';
import { TemplateService } from '@app/email/services';
import { EmailRmqController } from './ui';

@Module({
  imports: [
    RmqTopologyModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        bindings: [
          {
            url: config.rmq.url,
            exchange: config.rmq.exchange,
            queue: config.rmq.queue,
            routingKey: ROUTING_KEYS.EMAIL_WELCOME,
          },
          {
            url: config.rmq.url,
            exchange: config.rmq.exchange,
            queue: config.rmq.queue,
            routingKey: ROUTING_KEYS.EMAIL_OPTIMIZATION_SUCCESS,
          },
          {
            url: config.rmq.url,
            exchange: config.rmq.exchange,
            queue: config.rmq.queue,
            routingKey: ROUTING_KEYS.EMAIL_OPTIMIZATION_ERROR,
          },
        ],
      }),
    }),
  ],
  controllers: [EmailRmqController],
  providers: [
    TemplateService,
    {
      provide: EMAIL_PROVIDER,
      useClass: BrevoEmailProvider,
    },
    WelcomeEmailHandler,
    OptimizationSuccessEmailHandler,
    OptimizationErrorEmailHandler,
  ],
})
export class EmailModule {}
