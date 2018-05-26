//  @flow

import mongoose from 'mongoose'

import { MONGO_URI, MONGO_DATABASE_NAME } from './config'

export const connectDatabase = () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .on('open', () => console.log('Database connection openned.'))
      .once('open', () => resolve(mongoose.connections[0]))

    mongoose.connect(`${MONGO_URI}${MONGO_DATABASE_NAME}`, { autoIndex: false })
  })
}
