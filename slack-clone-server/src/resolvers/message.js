import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./authorization";
import message from "../schema/message";
import { formatError } from "graphql";

export default {
  Message: {
    user: async ({ userId }, __, {models }) => {
      return await models.User.findOne({ where: { id: userId } }, { raw: true })
    }
  },
  Query: {
    messages: 
    combineResolvers(
      isAuthenticated,
      async (_, { channelId }, {models}) => {
        return await models.Message.findAll(
          { order: [['createdAt', 'ASC']], where: { channelId } },
          { raw: true }
        );
      }
    ) 
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (_, args, {models, user}) => {
        try {
          const message = await models.Message.create({...args, userId: user.id});
          console.log(message);
          return {
            ok: true,
            message: message,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            errors: formatError(err)
          };
        }    
      }
    )
  },


}