import { IsDefined } from "class-validator";

export class LoginDto {
  @IsDefined()
  username: string;

  @IsDefined()
  password: string;
}
