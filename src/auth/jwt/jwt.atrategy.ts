import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { UserService } from 'src/users/users.service';

export interface JwtPayload {
  username: string;
  sub: string;
  roles: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Do not ignore expiration
      secretOrKey: configService.get<string>('JWT_SECRET'), // Get secret from configuration
    });
  }

  async validate(payload: JwtPayload) {
    // Here you can add more logic, such as checking if the user still exists in the database.
    // For now, just return the payload, which represents the authenticated user.
    const user = await this.userService.findOne(payload.sub);
    if(!user){
      throw new UnauthorizedException("Invalid Token");
    }
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
