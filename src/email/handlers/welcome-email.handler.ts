import { Inject, Injectable } from '@nestjs/common';
import type { WelcomeEmailEvent } from '@prompt-optimizer/common-lib/notification-events';

import { EMAIL_PROVIDER, type EmailProvider } from '../services/email-provider';
import { TemplateService } from '../services/template.service';

@Injectable()
export class WelcomeEmailHandler {
  constructor(
    @Inject(EMAIL_PROVIDER) private readonly emailProvider: EmailProvider,
    private readonly templateService: TemplateService,
  ) {}

  async execute(event: WelcomeEmailEvent): Promise<void> {
    const html = this.templateService.render('welcome', {
      name: event.recipient.name,
    });

    await this.emailProvider.sendEmail(event.recipient, 'Welcome to Prompt Optimizer!', html);
  }
}
