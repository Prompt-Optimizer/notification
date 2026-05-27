import { BrevoClient } from '@getbrevo/brevo';
import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '@app/config';
import type { EmailProvider, EmailRecipient } from '@app/email/services';

@Injectable()
export class BrevoEmailProvider implements EmailProvider {
  private readonly logger = new Logger(BrevoEmailProvider.name);
  private readonly client: BrevoClient;
  private readonly sender: { email: string; name: string };

  constructor(private readonly config: ConfigService) {
    const { apiKey, senderEmail, senderName } = this.config.brevo;

    this.client = new BrevoClient({ apiKey });
    this.sender = { email: senderEmail, name: senderName };
  }

  async sendEmail(to: EmailRecipient, subject: string, html: string): Promise<void> {
    try {
      await this.client.transactionalEmails.sendTransacEmail({
        sender: this.sender,
        to: [{ email: to.email, name: to.name }],
        subject,
        htmlContent: html,
      });

      this.logger.log(`Email sent to ${to.email}: "${subject}"`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to.email}: ${(error as Error).message}`);
      throw error;
    }
  }
}
