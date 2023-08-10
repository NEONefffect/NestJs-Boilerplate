import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import config from "config";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) return user;
    else return null;
  }

  login(user) {
    return {
      accessToken: this.jwtService.sign({
        id: user.id,
      }),
    };
  }

  async register(dto: RegistrationDto) {
    const hashPassword = await this.hashPassword(dto.password);

    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
      role: UserRoles.User,
    });
    const portfolio = await this.portfolioService.create({
      name: "Main Portfolio",
      user,
    });
    await this.userService.create({
      ...user,
      portfolios: [portfolio],
    });

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
      }),
    };
  }

  async restorePassword(email: string) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new BadRequestException(
        "User is not found. Please contact support",
      );
    }

    await this.emailsServices.sendEmail({
      recipient: email,
      subject: "TradingPiranha. Get your new password",
      message: generateRestorePasswordEmail({
        firstName: user.firstName,
        token: this.jwtService.sign({ email }, { expiresIn: "30m" }),
      }),
    });
  }

  async setPassword(token, password) {
    let tokenData;
    try {
      tokenData = this.jwtService.verify(token, { secret: config.JWT_SECRET });
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }

    const user = await this.userService.findOne({ email: tokenData.email });
    const hashPassword = await this.hashPassword(password);
    user.password = hashPassword;

    await this.userService.update({ id: user.id }, { password: hashPassword });
  }
}
