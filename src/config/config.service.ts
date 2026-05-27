import { Inject, Injectable } from '@nestjs/common';

import { ENV, type Env } from './env.schema';

@Injectable()
export class ConfigService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  get port() {
    return this.env.PORT;
  }

  get rmq() {
    return {
      url: this.env.RMQ_URL,
      exchange: {
        name: this.env.RMQ_EXCHANGE_NAME,
        type: this.env.RMQ_EXCHANGE_TYPE,
      },
      queue: {
        name: this.env.RMQ_QUEUE_NAME,
        type: this.env.RMQ_QUEUE_TYPE,
      },
    };
  }

  get brevo() {
    return {
      apiKey: this.env.BREVO_API_KEY,
      senderEmail: this.env.BREVO_SENDER_EMAIL,
      senderName: this.env.BREVO_SENDER_NAME,
    };
  }
}
