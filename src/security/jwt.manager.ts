import * as jwt from "jsonwebtoken";
import * as fs from 'fs';
import {IUser} from "../users/schema/user.schema";

export class JwtManager{
    public static generateToken(user: IUser): string
    {
        let privateKey = fs.readFileSync(__dirname + "/../../.." + process.env.PRIVATE_KEY_PATH);

        return jwt.sign({ username: user.username }, privateKey, { algorithm: 'RS256'});
    }

    public static verifyToken(token: string): any
    {
        let cert = fs.readFileSync(__dirname + "/../../.." + process.env.PUBLIC_KEY_PATH);

        return jwt.verify(token, cert);
    }
}

