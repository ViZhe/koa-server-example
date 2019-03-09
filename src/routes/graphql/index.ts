
import { ApolloServer, gql } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';
import Koa from 'koa';
import merge from 'lodash/merge';

import { GRAPHQL, IS_PRODUCTION } from '../../config';
import { resolvers as UserResolvers, typeDef as User } from './types/User';


const schemaDefinition = gql`
  schema {
    query: Query
    mutation: Mutation
  }
`;

const query = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    null: Boolean
  }
`;

const resolvers = {};

const graphqlSchema = makeExecutableSchema({
  resolvers: merge(
    resolvers,
    UserResolvers,
  ),
  typeDefs: [
    schemaDefinition,
    query,
    User,
  ],
});

const server = new ApolloServer({
  cacheControl: true,
  context: (ctx: Koa.Context) => ctx.context,
  formatError: IS_PRODUCTION ? GRAPHQL.formatErrorProd : GRAPHQL.formatErrorDev,
  schema: graphqlSchema,
  tracing: true,
});


export default server;
