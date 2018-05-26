// @flow

import { pubsub } from '../config'
import GraphQLCat from '../outputs/Cat'

import type { Cat } from '../types/Cat'

export default {
  type: GraphQLCat,
  resolve: (payload: Cat) => payload,
  subscribe: () => pubsub.asyncIterator('removedCat')
}
