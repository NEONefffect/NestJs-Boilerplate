import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import config from "config";
import { Profile, Strategy } from "passport-facebook";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor() {
    super({
      clientID: config.FACEBOOK.CLIENT_ID,
      clientSecret: config.FACEBOOK.CLIENT_SECRET,
      callbackURL: config.USER_PORTAL_HOST + "/sign-in",
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, id } = profile;

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      facebookId: id,
    };
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
