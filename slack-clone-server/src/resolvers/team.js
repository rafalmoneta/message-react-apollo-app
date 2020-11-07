import formatErrors from "../helpers/formatErrors";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./authorization";

export default {
  Query: {
    allTeams: combineResolvers( 
      isAuthenticated,
      async (_, __, {models, user}) => {
        return models.Team.findAll({ where: { owner: user.id }}, {raw: true});
      } 
    ),
    inviteTeams: combineResolvers(
      isAuthenticated,
      async(_, __, {models, user}) => {
        return models.Team.findAll(
          {
            include: [
              {
                model: models.User,
                where: { id: user.id},
              },
            ],
          },
          { raw: true },
        )
      }
    ) 
  },

  Mutation: {
    createTeam: combineResolvers(
      isAuthenticated,
      async (_, {input}, {models, user}) => {
        try {
          const response = await models.sequelize.transaction(async () => {
            const team = await models.Team.create({ ...input, owner: user.id});
            await models.Channel.create({ name: 'general', public: true, teamId: team.id});
            return team;  
          })
          
          return {
            ok: true,
            team: response,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            errors: formatErrors(err) 
          };
        }
      }),
    addTeamMember: combineResolvers(
      isAuthenticated,
      async (_, { email, teamId }, { models, user }) => {
        try {
          const teamPromise = models.Team.findOne({ where: { id: teamId } }, { raw: true });
          const userToAddPromise = models.User.findOne({ where: { email } }, { raw: true });
          const [team, userToAdd] = await Promise.all([teamPromise, userToAddPromise]);

          if(team.owner !== user.id) {
            return {
              ok: false,
              errors: [{ path: 'email', message: 'You cannot add members to the team'}],
            };
          }

          if(!userToAdd) {
            return {
              ok: false,
              errors: [{ path: 'email', message: 'Could not find user with this email'}],
            };
          }

          await models.Member.create({ userId: userToAdd.id, teamId });
          return {
            ok: true,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            errors: formatErrors(err) 
          };
        }
      }),
  },

  Team: {
    channels: async (team, __, {models}) => {
      return await models.Channel.findAll({ where: { teamId: team.id }});
    }
  }
  
}