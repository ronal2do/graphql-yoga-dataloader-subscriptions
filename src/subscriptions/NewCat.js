// @flow

import { pubsub } from '../config'
import GraphQLCat from '../entity/Cat'

import type { Cat } from '../types/Cat'

export default {
  type: GraphQLCat,
  resolve: (payload: Cat) => payload,
  subscribe: () => pubsub.asyncIterator('newCat')
}
