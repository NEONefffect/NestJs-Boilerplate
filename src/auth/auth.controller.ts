import { Body, Get, Patch, Query } from "@nestjs/common";
import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegistrationDto } from "./dto/register.dto";
import { ForgotPasswordDto } from "./dto/reset-password.dto";
import { SetPasswordDto } from "./dto/set-password.dto";
import { GoogleOAuthGuard } from "./guard/google.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  // constructor(private readonly authService: AuthService) {}
  // @ApiBody({ type: LoginDto })
  // @UseGuards(AuthGuard("local"))
  // @Post("login")
  // login(@Req() { user }) {
  //   return this.authService.login(user);
  // }
  // @Post("registration")
  // registration(@Body() dto: RegistrationDto) {
  //   return this.authService.register(dto);
  // }
  // @Post("reset-password")
  // forgotPassword(@Body() { email }: ForgotPasswordDto) {
  //   return this.authService.restorePassword(email);
  // }
  // @Patch("set-password")
  // setPassword(@Body() dto: SetPasswordDto) {
  //   return this.authService.setPassword(dto.token, dto.password);
  // }
  // @Get("google")
  // @UseGuards(GoogleOAuthGuard)
  // async googleAuth(@Req() req) {}
  // @Get("google-redirect")
  // @UseGuards(GoogleOAuthGuard)
  // googleAuthRedirect(@Req() req) {
  //   return this.authService.googleLogin(req);
  // }
  // @Get("facebook")
  // @UseGuards(AuthGuard("facebook"))
  // async facebookLogin(): Promise<any> {
  //   return;
  // }
  // @Get("facebook-redirect")
  // @UseGuards(AuthGuard("facebook"))
  // async facebookLoginRedirect(@Req() req): Promise<any> {
  //   return this.authService.facebookLogin(req.user);
  // }
  // @Post("send-confirm-email")
  // resendConfirmationEmail(@Query("email") email: string) {
  //   return this.authService.resendConfirmationEmail(email);
  // }
}
