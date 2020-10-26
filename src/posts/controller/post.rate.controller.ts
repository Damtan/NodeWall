import {inject, injectable} from "inversify";
import {
    Authorized,
    CurrentUser,
    JsonController, Param,
    Post, UseBefore
} from "routing-controllers";

import {IUser} from "../../users/schema/user.schema";
import {ValidationIdMiddleware} from "../../middleware/validation/validation.id.middleware";
import {PostRateService} from "../services/post.rate.service";

@injectable()
@JsonController()
export class PostCommentRateController {
    @inject(PostRateService) private postRateService: PostRateService;

    @Authorized()
    @Post("/posts/:id/rate/up")
    @UseBefore(ValidationIdMiddleware)
    public async rateUP(@CurrentUser() user: IUser, @Param("id") id: string): Promise<boolean>{
        await this.createRate(user, id,  true);

        return true;
    }

    @Authorized()
    @Post("/posts/:id/rate/down")
    @UseBefore(ValidationIdMiddleware)
    public async rateDown(@CurrentUser() user: IUser, @Param("id") id: string): Promise<boolean>{
        await this.createRate(user, id,  false);

        return true;
    }

    private async createRate(user: IUser, id: string, vote: boolean) {
        await this.postRateService.create(id,  vote, user);
    }
}