import { buildGraphQLError } from '@gocommerce/utils'

export const generate = async (makeApiCall: Function) => {
  const errorList: Array<{ message: string, code: string }> = []

  var d = new Date()

  let { data: responseData, error: errorIam } = await makeApiCall('/iam/identity-providers/application-keys', 'post', {
    partner: 'bling',
    name: 'generated-on-' + d.getTime()
  })

  if (errorIam) {
    errorList.push({ message: 'Fail generate app secret and app token', code: errorIam.status })
    throw buildGraphQLError('Fail generate app secret and app token', errorIam.response.status)
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
