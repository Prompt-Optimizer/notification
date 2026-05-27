import { Module } from '@nestjs/common';

import { ConfigModule } from '@app/config';

import { EmailModule } from './email/email.module';

@Module({
  imports: [ConfigModule, EmailModule],
})
export class AppModule {}
