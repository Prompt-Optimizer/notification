export const EMAIL_PROVIDER = Symbol('EMAIL_PROVIDER');

export interface EmailRecipient {
  email: string;
  name: string;
}

export interface EmailProvider {
  sendEmail(to: EmailRecipient, subject: string, html: string): Promise<void>;
}
