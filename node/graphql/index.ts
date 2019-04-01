import { loggerMiddleware } from '@gocommerce/utils'
import { generate } from './Mutation'

const splunkToken = 'dd433cc0-9106-4b0d-883a-377d57e8eb1a'

export const resolvers = loggerMiddleware(splunkToken, {
  Query: {
    appFakeCredentials: async (_, param, ctx, info, makeApiCall) => {}
  },
  Mutation: {
    generateCredentials: async (_, param, ctx, info, makeApiCall) => await generate(param, makeApiCall, ctx)
  }
})
