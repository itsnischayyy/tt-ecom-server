import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/users/repositories/user.repository';
import { UserService } from 'src/users/users.service';
import { JwtStrategy } from './jwt/jwt.atrategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    UserRepository,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserRepository, ConfigService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
