// @flow
import DataLoader from 'dataloader'
import { Cat as CatModel } from '../models'
import {
  connectionFromMongoCursor,
  mongooseLoader
} from '@entria/graphql-mongoose-loader'

import type { ConnectionArguments } from 'graphql-relay'
import type { GraphQLContext } from '../TypeDefinition'
import type { CatType } from '../types/Cat'

export default class Cat {
  id: string
  name: string
  nickName: string
  description: string
  createdAt: string
  updatedAt: string
  avatarUrl: string
  age: number

  constructor (data: CatType, { user }: GraphQLContext) {
    this.id = data.id
    this._id = data._id
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
  new DataLoader(ids => mongooseLoader(CatModel, ids))

const viewerCanSee = (context, data) => {
  // Anyone can see another user
  return true
}

export const load = async (
  context: GraphQLContext,
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

export const clearCache = ({ dataloaders }: GraphQLContext, id: string) => {
  return dataloaders.CatLoader.clear(id.toString())
}

export const loadCats = async (
  context: GraphQLContext,
  args: ConnectionArguments
) => {
  const where = args.search
    ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } }
    : {}
  const users = CatModel.find(where, { _id: 1 }).sort({ createdAt: -1 })

  return connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: load
  })
}
