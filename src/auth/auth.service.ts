import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

import config from "config";
import { UserService } from "../user/user.service";
import { RegistrationDto } from "./dto/register.dto";
import { EmailsService } from "common/services/emails.service";
import {
  generateConfirmedEmail,
  generateRestorePasswordEmail,
} from "common/data-pool/email-template";
import { exceptionMessages } from "common/constant/exceprion-messages";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  // constructor(
  //   private readonly userService: UserService,
  //   private jwtService: JwtService,
  //   private emailsServices: EmailsService,
  // ) {}

  // async comparePassword(
  //   suppliedPassword: string,
  //   hashedPassword: string,
  // ): Promise<boolean> {
  //   const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
  //   const suppliedPasswordBuf = (await scryptAsync(
  //     suppliedPassword,
  //     config.SALT,
  //     64,
  //   )) as Buffer;
  //   return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  // }

  // async hashPassword(password: string) {
  //   const buf = (await scryptAsync(password, config.SALT, 64)) as Buffer;
  //   return buf.toString("hex");
  // }

  // async validateUser(email: string, password: string) {
  //   const user = await this.userService.findOneOrFail({ email });

  //   if (user.isActive === false) {
  //     throw new BadRequestException(
  //       "User is not active. Please contact support",
  //     );
  //   }

  //   return await this.comparePassword(password, user.password);
  // }

  // login(user) {
  //   return {
  //     accessToken: this.jwtService.sign({
  //       id: user.id,
  //     }),
  //   };
  // }

  // async register(dto: RegistrationDto) {
  //   const { email } = dto;

  //   const hashPassword = await this.hashPassword(dto.password);

  //   const user = await this.userService.create({
  //     ...dto,
  //     password: hashPassword,
  //     isActive: false,
  //   });

  //   // await this.emailsServices.sendEmail({
  //   //   recipient: email,
  //   //   subject: "Create your new account",
  //   //   message: generateRestorePasswordEmail({
  //   //     firstName: user.firstName,
  //   //     token: this.jwtService.sign({ email }, { expiresIn: "30m" }),
  //   //   }),
  //   // });
  //   return user;
  // }

  // async restorePassword(email: string) {
  //   const user = await this.userService.findOne({ where: { email } });
  //   if (!user) {
  //     throw new BadRequestException(
  //       "User is not found. Please contact support",
  //     );
  //   }

  //   await this.emailsServices.sendEmail({
  //     recipient: email,
  //     subject: "Get your new password",
  //     message: generateRestorePasswordEmail({
  //       firstName: user.firstName,
  //       token: this.jwtService.sign({ email }, { expiresIn: "30m" }),
  //     }),
  //   });
  // }

  // async setPassword(token, password) {
  //   let tokenData;
  //   try {
  //     tokenData = this.jwtService.verify(token, { secret: config.JWT_SECRET });
  //   } catch (e) {
  //     this.logger.error(e);
  //     throw new BadRequestException(e.message);
  //   }

  //   const user = await this.userService.findOne({
  //     where: { email: tokenData.email },
  //   });
  //   const hashPassword = await this.hashPassword(password);
  //   user.password = hashPassword;

  //   await this.userService.update(user.id, { password: hashPassword });
  // }

  // async confirmEmail(token: string) {
  //   let tokenData;
  //   try {
  //     tokenData = this.jwtService.verify(token, { secret: config.JWT_SECRET });
  //   } catch (e) {
  //     this.logger.error(e);
  //     throw new BadRequestException(e.message);
  //   }

  //   const user = await this.userService.findOneOrFail({
  //     email: tokenData.email,
  //   });

  //   await this.userService.update(user.id, {
  //     isActive: true,
  //   });
  //   return this.login(user);
  // }
  // async resendConfirmationEmail(email) {
  //   const user = await this.userService.findOneOrFail({ email });

  //   await this.emailsServices.sendEmail({
  //     recipient: email,
  //     subject: "Create your new account",
  //     message: generateConfirmedEmail({
  //       fullName: user.firstName + " " + user.lastName,
  //       token: this.jwtService.sign({ email }, { expiresIn: "30m" }),
  //     }),
  //   });
  // }
  // async googleLogin(req: {
  //   user: {
  //     email: string;
  //     firstName: string;
  //     lastName: string;
  //     picture: string;
  //   };
  // }) {
  //   if (!req.user)
  //     throw new ForbiddenException(exceptionMessages.USER_NOT_FOUND);

  //   const user = await this.userService.findOne({
  //     where: { email: req.user.email },
  //   });

  //   if (user) return this.login(user);

  //   const newUser = await this.userService.create({
  //     lastName: req.user.lastName,
  //     firstName: req.user.firstName,
  //     email: req.user.email,
  //     isActive: true,
  //   });
  //   return this.login(newUser);
  // }
  // async facebookLogin(req) {
  //   if (!req.user)
  //     throw new ForbiddenException(exceptionMessages.USER_NOT_FOUND);

  //   const user = await this.userService.findOne({
  //     where: { facebookId: req.user.facebookId },
  //   });

  //   if (user) return this.login(user);

  //   const newUser = await this.userService.create({
  //     lastName: req.user.lastName,
  //     firstName: req.user.firstName,
  //     email: req.user.email,
  //     isActive: true,
  //     facebookId: req.user.facebookId,
  //   });
  //   return this.login(newUser);
  // }
}
