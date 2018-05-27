// @flow

import { GraphQLSchema } from 'graphql'

import RootQuery from './queries'
import RootMutation from './mutations'
import RootSubscription from './subscriptions'

const schemaDefinition: Object = {
  query: RootQuery,
  mutation: RootMutation,
  subscription: RootSubscription
}

export const schema = new GraphQLSchema(schemaDefinition)
