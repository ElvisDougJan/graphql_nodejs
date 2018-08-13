import { GraphQLResolveInfo } from "graphql";

import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { parseNamedType } from "graphql/language/parser";
import { PostInstance } from "../../../models/PostModels";
 
export const postResolvers = {

  Post: {
    author: (post: PostInstance, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.User.findById(post.get('author'));
    },

    comments: (post: PostInstance, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Comment.findAll({
        where: {post: post.get('id')},
        limit: first,
        offset: offset
      })
    }
  },

  Query: {
    posts: (parent, { first = 10, offset = 0 }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Post.findAll({
        limit: first,
        offset: offset
      });
    },

    post: (parseNamedType, { id }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Post.findById(id).then((post: PostInstance) => {
        if(!post) throw new Error(`Post com o id ${id} não encontrado!`);
        return post;
      })
    }
  }
};

