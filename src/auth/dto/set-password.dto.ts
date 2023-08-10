import { IsString, Matches } from "class-validator";

export class SetPasswordDto {
  @Matches(/^(?=.*[A-Za-z]|!)(?=.*\d)[A-Za-z\d]|!{6,}$/)
  password: string;

  @IsString()
  token: string;
}
