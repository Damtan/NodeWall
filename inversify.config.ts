import { Container } from "inversify";
import {userContainer} from "./src/users/di/user.container";
import {postContainer} from "./src/posts/di/post.container";
import {sharedContainer} from "./src/shared/di/shared.container";

const myContainer =  Container.merge(Container.merge(userContainer, postContainer), sharedContainer);

export { myContainer };