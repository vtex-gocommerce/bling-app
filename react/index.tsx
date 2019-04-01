import * as React from 'react'
import { injectIntl } from 'react-intl'
import { GcMutation } from 'gocommerce.gc-utils'
import { Context } from 'gocommerce.gc-context'
import BlingForm from './BlingForm'
import generateCredentials from './graphql/generateCredentials.gql'

interface IndexPageProps {
  intl: any
}

interface IndexPageState {}

class Bling extends React.Component<IndexPageProps, IndexPageState> {
  render() {
    const { intl } = this.props

    const blingConfig = {
      appKey: '********************************',
      appToken: '********************************'
    }

    return (
      <Context.AccountContext.Consumer>
        {({ accountData }) => (
          <GcMutation mutation={generateCredentials}>
            {(generateCredentials, dataSave) => (
              <BlingForm
                intl={intl}
                account={accountData}
                blingConfig={blingConfig}
                generateAppCredentials={generateCredentials}
                errorGenerateAppCredentials={dataSave.data && dataSave.data.generateCredentials.userErrors}
                isLoadingGenerateAppCredentials={dataSave.loading}
              />
            )}
          </GcMutation>
        )}
      </Context.AccountContext.Consumer>
    )
  }
}

export default injectIntl(Bling)
