import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import config from "config";

import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: config.GOOGLE.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: config.GOOGLE.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: config.USER_PORTAL_HOST + "/sign-in",
      scope: ["profile", "email"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
