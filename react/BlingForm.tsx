import * as React from 'react'
import { Form } from 'gocommerce.gc-utils'
import { useIntl } from 'react-intl'

import { useRuntime } from 'vtex.render-runtime'
import { TemplatePage } from 'gocommerce.gc-utils'
import { Alert, Notify, Container, Modal } from 'gocommerce.styleguide'
import { Button, Layout, PageHeader } from 'vtex.styleguide'

import PlaceHolderContainerCard from './components/placeHolderContainerCard'

interface BlingFormProps {
  account: any
  blingConfig: any
  generateAppCredentials: Function
  errorGenerateAppCredentials: any
  isLoadingGenerateAppCredentials: boolean
}

const BlingForm = ({
  account,
  blingConfig,
  isLoadingGenerateAppCredentials,
  generateAppCredentials,
}: BlingFormProps) => {
  const [openModal, setOpenModal] = React.useState(false)
  const [generated, setGenerated] = React.useState(false)
  const [appKey, setAppKey] = React.useState(blingConfig.appKey)
  const [appToken, setAppToken] = React.useState(blingConfig.appToken)

  const { formatMessage } = useIntl()
  const { navigate } = useRuntime()

  const handleSubmitForm = (values: any) => {
    setOpenModal(true)
    generateAppCredentials({ variables: { data: JSON.stringify(values) } })
      .then(({ data: { generateCredentials }}) => {
        if (
          generateCredentials.status === 'success' &&
          generateCredentials.userErrors.length === 0
        ) {
          Notify.show(formatMessage({ id: 'admin/appBling.textSugestion' }), {
            position: 'top-right',
            type: 'success'
          })

          setOpenModal(false)
          setAppKey(generateCredentials.key)
          setAppToken(generateCredentials.secret)
          setGenerated(true)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleBack = () => {
    return navigate({
      page: 'admin.app.apps.setup',
      params: { appId: 'gocommerce.bling-app@2.x' },
    })
  }

  return (
    <TemplatePage>
      <Layout
        pageHeader={
          <PageHeader
            title={formatMessage({ id: 'admin/appBling.partner' })}
            linkLabel={formatMessage({ id: 'admin/appBling.settings' })}
            onLinkClick={handleBack}
          />
        }
      >
        {isLoadingGenerateAppCredentials ? (
          <PlaceHolderContainerCard isPlaceholderActive={true}>{() => <div />}</PlaceHolderContainerCard>
        ) : (
          <div>
            {generated && (
              <div className="g-mb2">
                <Alert title={formatMessage({ id: 'admin/appBling.attentionTitle' })} type="warning">
                  {formatMessage({ id: 'admin/appBling.attentionInfo' })}
                </Alert>
              </div>
            )}

            <Form id="FormId" onSubmit={handleSubmitForm}>
              {stateData => (
                <>
                  <Container isPlaceholderActive={isLoadingGenerateAppCredentials} id="default">
                    <h2 className="g-ma0 g-f4 fw6">
                      {formatMessage({ id: 'admin/appBling.formTitle' })}
                    </h2>

                    <div className="g-mt6">
                      <Form.Input
                        label={formatMessage({ id: 'admin/appBling.account'})}
                        className="w-100 tracked-mega g-f1"
                        name="account"
                        value={account.id}
                        disabled={true}
                      />
                    </div>

                    <div className="g-mt6">
                      <Form.Input
                        label={formatMessage({ id: 'admin/appBling.appKey'})}
                        className="w-100 tracked-mega g-f1"
                        name="appKey"
                        value={appKey}
                        disabled={true}
                      />
                    </div>

                    <div className="g-mt6">
                      <Form.Input
                        label={formatMessage({ id: 'admin/appBling.appToken'})}
                        className="w-100 tracked-mega g-f1"
                        name="appToken"
                        value={appToken}
                        disabled={true}
                      />
                    </div>
                  </Container>
                </>
              )}
            </Form>

            <div className="flex justify-between">
              <Button size="large" variation="secondary" onClick={handleBack}>
                {formatMessage({ id: 'admin/appBling.buttonCancel' })}
              </Button>

              <div className="fixed static-ns w-100 w-auto-ns bottom-0 left-0 z-999">
                <Button
                  size="large"
                  id="openModalGenerate"
                  onClick={() => setOpenModal(true)}
                  isLoading={isLoadingGenerateAppCredentials}
                >
                  {formatMessage({ id: 'admin/appBling.buttonGenerate' })}
                </Button>
              </div>
            </div>

            <Modal
              className="w-50-l"
              open={openModal}
              onClose={() => setOpenModal(false)}
              showCloseIcon={true}
              centered={true}
            >
              <p className="ma0 g-f5 fw6 navy">
                {formatMessage({ id: 'admin/appBling.confirm' })}
              </p>

              <p className="ma0 g-pv4 g-f3 c-on-base-2">
                {formatMessage({ id: 'admin/appBling.disclaimer' })}
              </p>

              <div className="flex justify-between">
                <div className="dn dib-ns link">
                  <Button size="large" onClick={() => setOpenModal(false)} variation="secondary">
                    {formatMessage({ id: 'admin/appBling.buttonCancel' })}
                  </Button>
                </div>

                <Form.SubmitButton
                  id="carrierSubmit"
                  formId="FormId"
                  disabled={isLoadingGenerateAppCredentials}
                  className="fixed static-ns w-100 w-auto-ns bottom-0 left-0 z-999"
                  isLoading={isLoadingGenerateAppCredentials}
                >
                  {formatMessage({ id: 'admin/appBling.buttonGenerate' })}
                </Form.SubmitButton>
              </div>
            </Modal>
          </div>
        )}
      </Layout>
    </TemplatePage>
  )
}

export default BlingForm
