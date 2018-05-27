// @flow
import { GraphQLInt } from 'graphql'
import { connectionDefinitions, connectionArgs } from 'graphql-relay'

import GraphQLCat from '../entity/Cat'
import { CatLoader } from '../loaders'
import type { GraphqlContextType } from '../types/GraphqlContextType'

const { connectionType: AllCatsConnection } = connectionDefinitions({
  name: 'Cat',
  nodeType: GraphQLCat,
  connectionFields: {
    count: {
      type: GraphQLInt
    }
  }
})

export default {
  type: AllCatsConnection,
  args: {
    ...connectionArgs
  },
  resolve: async (_: mixed, args: Object, context: GraphqlContextType) =>
    CatLoader.loadCats(context, args)
}
