import {RegisterDto} from "../form/dto/register.dto";

export interface UserRegisterInterface{
    register(registerData: RegisterDto): Promise<object>
}