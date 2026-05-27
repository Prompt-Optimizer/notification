import { Inject, Injectable } from '@nestjs/common';
import type { OptimizationSuccessEmailEvent } from '@prompt-optimizer/common-lib/notification-events';

import { EMAIL_PROVIDER, type EmailProvider } from '../services/email-provider';
import { TemplateService } from '../services/template.service';

@Injectable()
export class OptimizationSuccessEmailHandler {
  constructor(
    @Inject(EMAIL_PROVIDER) private readonly emailProvider: EmailProvider,
    private readonly templateService: TemplateService,
  ) {}

  async execute(event: OptimizationSuccessEmailEvent): Promise<void> {
    const html = this.templateService.render('optimization-success', {
      name: event.recipient.name,
      runId: event.runId,
    });

    await this.emailProvider.sendEmail(event.recipient, 'Your Optimization is Complete!', html);
  }
}
