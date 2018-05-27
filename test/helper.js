// https://github.com/entria/graphql-dataloader-boilerplate/blob/master/test/helper.jsimport mongoose from 'mongoose'
import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

process.env.NODE_ENV = 'test'

const MONGO_URL = 'mongodb://localhost/test'

const mongooseOptions = {
  autoIndex: false,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  connectTimeoutMS: 10000
}

mongoose.Promise = Promise

export async function connectMongoose () {
  // // $FlowExpectedError setTimeout is not defined on JestObject
  // jest.setTimeout(20000);
  return mongoose.connect(global.__MONGO_URI__, {
    ...mongooseOptions,
    dbName: global.__MONGO_DB_NAME__
  })
}

export async function disconnectMongoose () {
  // await mongoose.connection.close();
  return mongoose.disconnect()
}

export async function clearDatabase () {
  await mongoose.connection.db.dropDatabase()
}
