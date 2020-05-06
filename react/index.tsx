import * as React from 'react'

import { GcMutation } from 'gocommerce.gc-utils'
import { Context } from 'gocommerce.gc-context'

import BlingForm from './BlingForm'
import generateCredentials from './graphql/generateCredentials.gql'

const Bling = () => {
  const { accountData } = React.useContext(Context.AccountContext)

  const blingConfig = {
    appKey: '********************************',
    appToken: '********************************'
  }

  return (
    <GcMutation mutation={generateCredentials}>
      {(generateCredentials, dataSave) => (
        <BlingForm
          account={accountData}
          blingConfig={blingConfig}
          generateAppCredentials={generateCredentials}
          errorGenerateAppCredentials={dataSave.data && dataSave.data.generateCredentials.userErrors}
          isLoadingGenerateAppCredentials={dataSave.loading}
        />
      )}
    </GcMutation>
  )
}

export default Bling
