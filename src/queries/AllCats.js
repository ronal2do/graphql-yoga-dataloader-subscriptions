// @flow

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay'

import { sortArrayByDate } from '../models/Cat'
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
  resolve: async (
    _: mixed,
    args: Object,
    { RootModel }: GraphqlContextType
  ) => {
    const cats = await RootModel.Cat.find()
    sortArrayByDate(cats)

    return connectionFromArray(cats, args)
  }
}
