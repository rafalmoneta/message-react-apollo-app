import bcrypt from 'bcrypt';
import { tryLogin } from '../auth';
import formatErrors from '../helpers/formatErrors';

export default {
  Query: {
    user: async (_, { id }, { models }) => {
      return await models.User.findByPk(id)
    },
    users: async (_, __, { models }) => {
      return await models.User.findAll()
    }
  },

  Mutation: {
    login: async (_, {input}, {models, SECRET, SECRET2}) => tryLogin(input.email, input.password, models, SECRET, SECRET2),
    register: async (_, { input }, {models}) => {
      try {
        const user = await models.User.create(input);
        return {
          ok: true,
          user,
        };
      } catch (err) {
        console.log(err)
        return {
          ok: false,
          // errors: [{ path: 'name', message: 'something went wrong' }]
          errors: formatErrors(err)
        };
      }
      
    }
  }
}
