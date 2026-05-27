import { Inject, Injectable } from '@nestjs/common';
import type { OptimizationErrorEmailEvent } from '@prompt-optimizer/common-lib/notification-events';

import { EMAIL_PROVIDER, type EmailProvider } from '../services/email-provider';
import { TemplateService } from '../services/template.service';

@Injectable()
export class OptimizationErrorEmailHandler {
  constructor(
    @Inject(EMAIL_PROVIDER) private readonly emailProvider: EmailProvider,
    private readonly templateService: TemplateService,
  ) {}

  async execute(event: OptimizationErrorEmailEvent): Promise<void> {
    const html = this.templateService.render('optimization-error', {
      name: event.recipient.name,
      runId: event.runId,
      error: event.error,
    });

    await this.emailProvider.sendEmail(event.recipient, 'Optimization Failed', html);
  }
}
