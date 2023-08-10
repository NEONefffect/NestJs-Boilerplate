import { IsEmail, Matches } from "class-validator";
import { IsStringField } from "common/decorators/validators";

export class RegistrationDto {
  @IsStringField({
    maxLength: 30,
    minLength: 2,
    match: /^[a-zA-Z]+((['][a-zA-Z ])?[a-zA-Z]*)*$/,
  })
  firstName: string;

  @IsStringField({
    maxLength: 30,
    minLength: 2,
    match: /^[a-zA-Z]+((['][a-zA-Z ])?[a-zA-Z]*)*$/,
  })
  lastName: string;

  /*@example string@test.com
   */
  @IsEmail()
  email: string;

  @Matches(/^(?=.*[A-Za-z]|!)(?=.*\d)[A-Za-z\d]|!{6,}$/)
  password: string;
}
