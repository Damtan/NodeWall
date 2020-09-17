import { Container } from "inversify";
import {userContainer} from "./src/users/di/user.container";
import {postContainer} from "./src/posts/di/post.container";

const myContainer = Container.merge(userContainer, postContainer);

export { myContainer };