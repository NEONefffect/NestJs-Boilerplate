import { Body, Patch } from "@nestjs/common";
import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto/register.dto";
import { ForgotPasswordDto } from "./dto/reset-password.dto";
import { SetPasswordDto } from "./dto/set-password.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Req() { user }) {
    return this.authService.login(user);
  }

  @Post("registration")
  registration(@Body() dto: RegistrationDto) {
    return this.authService.register(dto);
  }

  @Post("reset-password")
  forgotPassword(@Body() { email }: ForgotPasswordDto) {
    return this.authService.restorePassword(email);
  }

  @Patch("set-password")
  setPassword(@Body() dto: SetPasswordDto) {
    return this.authService.setPassword(dto.token, dto.password);
  }
}
