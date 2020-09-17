import {IsDefined, IsEmail} from "class-validator";

export class RegisterDto {
    @IsDefined()
    @IsEmail()
    email: String;

    @IsDefined()
    password: String;
}