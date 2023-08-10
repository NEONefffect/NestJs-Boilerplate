import { PickType } from "@nestjs/swagger";
import { RegistrationDto } from "./register.dto";

export class LoginDto extends PickType(RegistrationDto, [
  "email",
  "password",
]) {}
