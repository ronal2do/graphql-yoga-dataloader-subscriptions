// @flow

import { GraphQLNonNull, GraphQLID } from 'graphql'

import { pubsub } from '../config'
import GraphQLCat from '../entity/Cat'

import type { GraphqlContextType } from '../types/GraphqlContextType'
import type { Cat as CatType } from '../types/Cat'

type argsType = {
  id: string,
}

export default {
  type: GraphQLCat,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (
    _: mixed,
    { id }: argsType,
    { models }: GraphqlContextType
  ): Promise<CatType> => {
    const cat = await new models.Cat({ _id: id }).remove()

    pubsub.publish('removedCat', cat)
    return cat
  }
}
