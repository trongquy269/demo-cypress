import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule].filter(Boolean),
  controllers: [],
  providers: [],
})
export class AppModule {}
