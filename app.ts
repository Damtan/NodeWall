import "reflect-metadata"; // this shim is required
import express from "express";
import {useExpressServer, useContainer, Action} from "routing-controllers";
import cors from "cors";
import dotenv from "dotenv";
import { RegisterController } from "./src/users/controller/register.controller";
import {myContainer} from "./inversify.config";
import {UserController} from "./src/users/controller/user.controller";
import {JwtManager} from "./src/security/jwt.manager";
import {PostController} from "./src/posts/controller/post.controller";

// its important to set container before any operation you do with routing-controllers,
// including importing controllers
useContainer(myContainer);
const app = express();

dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

useExpressServer( app,{
    controllers: [RegisterController, UserController, PostController], // we specify controllers we want to use
    classTransformer: true,
    authorizationChecker: async (action: Action, roles: string[]) => {
        return await !!JwtManager.getUser(action.request.headers["authorization"].split(' ')[1]);
    },
    currentUserChecker: async (action: Action) => {
        return await JwtManager.getUser(action.request.headers["authorization"].split(' ')[1]);
    }
});

app.use(cors());

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );