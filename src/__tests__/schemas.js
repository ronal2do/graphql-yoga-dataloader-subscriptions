import { addMockFunctionsToSchema, mockServer } from 'graphql-tools'
import { graphql, buildClientSchema } from 'graphql'
import { schema } from '../schema'

const testCaseA = {
  id: 'queryType',
  query: `
    query {
    __schema {
      queryType {
        name
      }
    }
  }
  `,
  variables: {},
  context: {},
  expected: { data: { __schema: { queryType: { name: 'RootQuery' } } } }
}

describe('Schema', () => {
  // Array of case types
  const cases = [testCaseA]
  addMockFunctionsToSchema({
    schema
  })

  test('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(schema)

      await MockServer.query(`{ __schema { types { name } } }`)
    }).not.toThrow()
  })

  cases.forEach(obj => {
    const { id, query, variables, context: ctx, expected } = obj

    test(`query: ${id}`, async () => {
      return await expect(
        graphql(schema, query, null, { ctx }, variables)
      ).resolves.toEqual(expected)
    })
  })
})
