// @flow
import { GraphQLServer } from 'graphql-yoga'
import { pubsub } from './serverConfig'

import { schema } from './schema'
import models from './models/index'
import { connectDatabase } from './database'

import { BASE_URI, PORT } from './serverConfig'
;(async () => {
  try {
    const info = await connectDatabase()
    console.log(`Connected to ${info.host}:${info.port}`)
  } catch (error) {
    console.error('Unable to connect to database')
    process.exit(1)
  }

  const server = new GraphQLServer({
    schema,
    context: {
      pubsub,
      models
    }
  })

  server.start({ port: PORT, cacheControl: true }, () =>
    console.log(`GraphQL Server is now running on ${BASE_URI}`)
  )
})()
