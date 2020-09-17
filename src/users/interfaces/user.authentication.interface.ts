import {LoginDto} from "../form/dto/login.dto";

export interface IUserAuthentication{
    login(loginData: LoginDto): Promise<object>
}