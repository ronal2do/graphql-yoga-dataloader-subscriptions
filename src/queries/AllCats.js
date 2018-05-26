// @flow

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay'
import { connectionFromMongoCursor } from '@entria/graphql-mongoose-loader'
import { GraphQLString } from 'graphql'

import GraphQLCat from '../outputs/Cat'

import type { GraphqlContextType } from '../types/GraphqlContextType'

const { connectionType: AllCatsConnection } = connectionDefinitions({
  nodeType: GraphQLCat
})

export default {
  type: AllCatsConnection,
  args: {
    ...connectionArgs
  },
  resolve: async (_: mixed, args: Object, { models }: GraphqlContextType) => {
    const cursor = await models.Cat.find().sort({ createdAt: -1 })
    console.log('context', cursor)
    return connectionFromArray(cats, args)
    // return connectionFromMongoCursor({
    //   cursor,
    //   context,
    //   args
    //   // loader: load
    // })
  }
}
