import { loggerMiddleware } from '@gocommerce/utils'
import { generate } from './graphql/Mutation'

const splunkToken = 'dd433cc0-9106-4b0d-883a-377d57e8eb1a'

export default {
  graphql: {
    resolvers: {
      Mutation: {
        generateCredentials: async (_, param, ctx, info, makeApiCall) => {
          console.log('OK')
        }
      }
    }
  }
}
