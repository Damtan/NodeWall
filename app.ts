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
import {connect} from "./src/db/db.connection";
import {ErrorMiddleware} from "./src/middleware/error/error.middleware";
import {PostCommentController} from "./src/posts/controller/post.comment.controller";

// its important to set container before any operation you do with routing-controllers,
// including importing controllers
useContainer(myContainer);
const app = express();

dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;


useExpressServer( app,{
    controllers: [RegisterController, UserController, PostController, PostCommentController], // we specify controllers we want to
    middlewares: [ErrorMiddleware],
    classTransformer: true,
    authorizationChecker: async (action: Action, roles: string[]) => {
        if (!action.request.headers["authorization"])
            return false;

        return await !!JwtManager.getUser(action.request.headers["authorization"].split(' ')[1]);
    },
    currentUserChecker: async (action: Action) => {
        if (!action.request.headers["authorization"])
            return false;

        return await JwtManager.getUser(action.request.headers["authorization"].split(' ')[1]);
    },
    defaultErrorHandler: false,
});

app.use(cors());
connect();
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );