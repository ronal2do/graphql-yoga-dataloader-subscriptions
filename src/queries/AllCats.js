// @flow

import { connectionDefinitions, connectionArgs } from 'graphql-relay'

import GraphQLCat from '../outputs/Cat'
import { CatLoader } from '../loaders'
import type { GraphqlContextType } from '../types/GraphqlContextType'

const { connectionType: AllCatsConnection } = connectionDefinitions({
  nodeType: GraphQLCat
})

export default {
  type: AllCatsConnection,
  args: {
    ...connectionArgs
  },
  resolve: async (_: mixed, args: Object, context: GraphqlContextType) =>
    CatLoader.loadCats(context, args)
}
