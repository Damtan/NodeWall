import { IsDefined, IsEmail } from "class-validator";

export class RegisterDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  password: string;
}
