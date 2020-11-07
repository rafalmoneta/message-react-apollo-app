import 'dotenv/config';
import cors from 'cors';
import express, { response } from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServer, AuthenticationError} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import { refreshTokens } from './auth';

const SECRET = process.env.SECRET;
const SECRET2 = process.env.SECRET2;

const app = express();

app.use(cors());

const getTokenForUser = async (req, res, next) => {
  const token = req.headers['x-token'];
 
  if (token) {
    try {
      const { user } = await jwt.verify(token, process.env.SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if(newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }

      req.user = newTokens.user;
      // throw new AuthenticationError(
      //   'Your session expired. Sign in again.',
      // );
    }
  }
  next();
};

app.use(getTokenForUser);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');
 
    return {
      ...error,
      message,
    };
  },
  context: async ({ req }) => {
    return {
      models,
      user: req.user,
      SECRET,
      SECRET2,
    };
  },
  
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = false;

models.sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});