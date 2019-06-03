import { loggerMiddleware } from '@gocommerce/utils'
import { generate } from './Mutation'

const splunkToken = 'dd433cc0-9106-4b0d-883a-377d57e8eb1a'

export interface Info { [key: string]: any }
export interface Context { [key: string]: any }
export interface Args { [key: string]: any }

export const resolvers = loggerMiddleware(splunkToken, {
  Query: {
    appFakeCredentials: async (_: any, _param: Args, _ctx: Context, _info: Info, _makeApiCall: Function) => {}
  },
  Mutation: {
    generateCredentials: async (_: any, _param: Args, _ctx: Context, _info: Info, makeApiCall: Function) => await generate(makeApiCall)
  }
})
