import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getEnv } from 'src/env';
import { Database } from 'src/database/seed';

import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';
import { JwtTokenService } from './services/jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: getEnv('JWT_SECRET'),
      signOptions: {
        expiresIn: Number(getEnv('JWT_EXPIRATION_TIME', '3600')),
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
    {
      provide: Database,
      useValue: new Database(),
    },
    UsersService,
    JwtTokenService,
  ],
  exports: [UsersService, JwtTokenService],
})
export class UsersModule {}
