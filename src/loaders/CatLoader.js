// @flow
import DataLoader from 'dataloader'
import { Cat as CatModel } from '../models'
import {
  connectionFromMongoCursor,
  mongooseLoader
} from '@entria/graphql-mongoose-loader'

import type { ConnectionArguments } from 'graphql-relay'
import type { Cat as CatType } from '../types/Cat'
import type { GraphqlContextType } from '../types/GraphqlContextType'

export default class Cat {
  id: string
  name: string
  nickName: string
  description: string
  createdAt: string
  updatedAt: string
  avatarUrl: string
  age: number

  constructor (data: CatType, { cat }: GraphqlContextType) {
    this.id = data.id
    this.name = data.name
    this.nickName = data.nickName
    this.description = data.description
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.avatarUrl = data.avatarUrl
    this.age = data.age
  }
}

export const getLoader = () =>
  // $FlowFixMe
  new DataLoader(ids => mongooseLoader(CatModel, ids))

const viewerCanSee = (context, data) => {
  // Anyone can see another cat
  return true
}

export const load = async (
  context: GraphqlContextType,
  id: string
): Promise<?Cat> => {
  if (!id) {
    return null
  }

  let data
  try {
    data = await context.dataloaders.CatLoader.load(id)
  } catch (err) {
    return null
  }
  return viewerCanSee(context, data) ? new Cat(data, context) : null
}

export const clearCache = ({ dataloaders }: GraphqlContextType, id: string) =>
  dataloaders.CatLoader.clear(id.toString())

export const loadCats = async (
  context: GraphqlContextType,
  args: ConnectionArguments
) => {
  const { Cat } = context.models
  const cursor = Cat.find().sort({ createdAt: -1 })

  return connectionFromMongoCursor({
    cursor,
    context,
    args,
    loader: load
  })
}
