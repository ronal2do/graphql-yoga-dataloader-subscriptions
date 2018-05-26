// @flow
import { GraphQLServer } from 'graphql-yoga'
import { pubsub, dataloaders } from './serverConfig'

import { schema } from './schemas'
import * as models from './models'
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
      models,
      dataloaders
    }
  })

  server.start({ port: PORT, cacheControl: true }, () =>
    console.log(`GraphQL Server is now running on ${BASE_URI}`)
  )
})()
