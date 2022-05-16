import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import 'dotenv/config';

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'], // 소셜 서비스마다 다름
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      // 구글에서 넘겨주지 않는 값은 default로 저장
      name: profile.displayName,
      email: profile.emails[0].value,
      phone: process.env.DEFAULT_PHONE,
      password: process.env.DEFAULT_PASSWORD,
      provider: 'GOOGLE',
    };
  }
}
