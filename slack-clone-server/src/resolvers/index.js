import { GraphQLDateTime } from 'graphql-iso-date';
 
import userResolvers from './user';
import messageResolvers from './message';
import teamResolvers from './team';
import channelResolvers from './channel';
 
const customScalarResolver = {
  Date: GraphQLDateTime,
};
 
export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
  teamResolvers,
  channelResolvers,
];