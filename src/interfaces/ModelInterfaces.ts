import { UserModel } from "../models/UserModel";
import { PostModel } from "../models/PostModels";
import { CommentModel } from "../models/CommentModel";

export interface ModelsInterface {
  User: UserModel;
  Post: PostModel;
  Comment: CommentModel;
}
