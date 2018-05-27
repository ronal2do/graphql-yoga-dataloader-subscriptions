import { request } from 'graphql-request'
import {
  connectMongoose,
  clearDatabase,
  disconnectMongoose
} from '../../test/helper'

const query = `{
	allCats(first: 1) {
    count
    edges {
      node {
        name
        id
        createdAt
        updatedAt
        avatarUrl
      }
    }
  }
}`

beforeAll(connectMongoose)
beforeEach(clearDatabase)
afterAll(disconnectMongoose)

describe('Test the root path', () => {
  test('adds 1 + 2 to equal 3', async () => {
    const response = await request('http://localhost:8080/', query)
    expect(response).toEqual({ allCats: { count: 0, edges: [] } })
  })
})
