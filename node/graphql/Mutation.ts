import { biuldGraphQlError } from '@gocommerce/utils'

export const generate = async (param, makeApiCall, ctx) => {
  const errorList = []

  let { data: responseData, error: errorIam } = await makeApiCall('/iam/identity-providers/application-keys', 'post', {
    partner: 'bling',
    name: 'defaultkey'
  })

  if (errorIam) {
    errorList.push({ message: 'Fail generate app secret and app token', code: errorIam.status })
    throw biuldGraphQlError('Fail generate app secret and app token', errorIam.response.status)
  }

  console.log('POST MUTATION')
  console.log(responseData)

  return {
    key: responseData.key,
    secret: responseData.secret,
    status: 'success',
    userErrors: errorList
  }
}
