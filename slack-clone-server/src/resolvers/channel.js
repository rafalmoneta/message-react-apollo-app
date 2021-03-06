import { formatError } from "graphql";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./authorization";

export default {
  Query: {

  },

  Mutation: {
    createChannel: combineResolvers(
      isAuthenticated,
      async (_, args, {models, user}) => {
        try {
          const team = await models.Team.findOne({ where: { id: args.teamId } }, { raw: true })

          if(team.owner !== user.id) {
            return {
              ok: false,
              errors: [
                {
                  path: 'name',
                  message: 'You have to be the owner of the team to create channels',
                },
              ],
            };
          }

          const channel = await models.Channel.create(args);
          return {
            ok: true,
            channel
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            errors: formatError(err)
          };
        }    
      },
    )
  }
}