import { readFile } from 'fs/promises';
import { join } from 'path';

import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class TemplateService implements OnModuleInit {
  private readonly templates = new Map<string, string>();
  private readonly templatesDir = join(__dirname, '..', 'templates');

  async onModuleInit(): Promise<void> {
    await this.loadTemplate('welcome');
    await this.loadTemplate('optimization-success');
    await this.loadTemplate('optimization-error');
  }

  render(templateName: string, variables: Record<string, string>): string {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`Template "${templateName}" not found`);
    }

    return Object.entries(variables).reduce((html, [key, value]) => html.replaceAll(`{{${key}}}`, value), template);
  }

  private async loadTemplate(name: string): Promise<void> {
    const content = await readFile(join(this.templatesDir, `${name}.html`), 'utf-8');
    this.templates.set(name, content);
  }
}
