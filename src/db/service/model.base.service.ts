import { Document, Model } from "mongoose";
import { injectable } from "inversify";

@injectable()
export abstract class ModelBaseService {
  protected abstract getModel(): Model<Document, unknown>;

  public async findById(id: string): Promise<Document> {
    return await this.getModel().findById(id);
  }

  public async find(query: object): Promise<Document[]> {
    return await this.getModel().find(query);
  }

  public async findOne(query: object): Promise<Document> {
    return await this.getModel().findOne(query);
  }

  public async deleteById(id: string): Promise<void> {
    await this.getModel().findByIdAndDelete(id).exec();
  }
}
