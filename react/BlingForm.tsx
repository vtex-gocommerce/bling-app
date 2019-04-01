import * as React from 'react'
import { WithNavigate, Form } from 'gocommerce.gc-utils'
import { FormattedMessage } from 'react-intl'
import { Link } from 'vtex.render-runtime'
import { TemplatePage } from 'gocommerce.gc-utils'
import { Alert, Button, IconSpinner, Notify, Container, Modal } from 'gocommerce.styleguide'
import PlaceHolderContainerCard from './components/placeHolderContainerCard'

interface BlingFormProps {
  account: any
  intl: any
  navigate?: Function
  blingConfig: any
  generateAppCredentials: Function
  errorGenerateAppCredentials: any
  isLoadingGenerateAppCredentials: boolean
}

interface BlingFormState {
  appKey: string
  appToken: string
  generated: boolean
  openModal: boolean
}

@WithNavigate.HOC()
class BlingForm extends React.PureComponent<BlingFormProps, BlingFormState> {
  constructor(props) {
    super(props)

    this.state = {
      appKey: props.blingConfig.appKey,
      appToken: props.blingConfig.appKey,
      generated: false,
      openModal: false
    }
  }

  formatMessage = (id: string) => this.props.intl.formatMessage({ id }, {})

  handleClickButton = () => {
    this.setState({
      openModal: true
    })
  }

  modalOnClose = () => {
    this.setState({
      openModal: false
    })
  }

  handleSubmitForm = values => {
    this.setState({
      openModal: false
    })

    this.props
      .generateAppCredentials({ variables: { data: JSON.stringify(values) } })
      .then(response => {
        if (
          response.data.generateCredentials.status === 'success' &&
          response.data.generateCredentials.userErrors.length === 0
        ) {
          Notify.show(this.props.intl.formatMessage({ id: 'admin.appBling.textSugestion' }), {
            position: 'top-right',
            type: 'success'
          })

          this.setState({
            openModal: false,
            appKey: response.data.generateCredentials.key,
            appToken: response.data.generateCredentials.secret,
            generated: true
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { blingConfig, account, isLoadingGenerateAppCredentials } = this.props
    const isLoadingData = isLoadingGenerateAppCredentials ? true : false

    const breadcrumbConfig = [
      { title: 'Apps', to: '/admin/apps' },
      { title: <FormattedMessage id="admin.appBling.partner" /> }
    ]

    return (
      <TemplatePage>
        <TemplatePage.Header
          breadcrumbConfig={breadcrumbConfig}
          buttons={
            <div className="dn db-ns">
              <Link className="link" to="/admin/apps">
                <Button style="secondary">
                  <FormattedMessage id="admin.appBling.buttonCancel" />
                </Button>
              </Link>
            </div>
          }
        />

        <TemplatePage.Content type="small">
          {isLoadingData ? (
            <PlaceHolderContainerCard isPlaceholderActive={true}>{() => <div />}</PlaceHolderContainerCard>
          ) : (
            <div>
              {this.state.generated && (
                <div className="g-mb2">
                  <Alert title={this.formatMessage('admin.appBling.attentionTitle')} type="warning">
                    <FormattedMessage id="admin.appBling.attentionInfo" />
                  </Alert>
                </div>
              )}

              <Form id="FormId" onSubmit={this.handleSubmitForm}>
                {stateData => (
                  <>
                    <Container isPlaceholderActive={this.props.isLoadingGenerateAppCredentials} id="default">
                      <h2 className="g-ma0 g-f4 fw6">
                        <FormattedMessage id="admin.appBling.formTitle" />
                      </h2>

                      <div className="g-mt6">
                        <Form.Input
                          label={this.formatMessage('admin.appBling.account')}
                          className="w-100 tracked-mega g-f1"
                          name="account"
                          value={account.id}
                          disabled={true}
                        />
                      </div>

                      <div className="g-mt6">
                        <Form.Input
                          label={this.formatMessage('admin.appBling.appKey')}
                          className="w-100 tracked-mega g-f1"
                          name="appKey"
                          value={this.state.appKey}
                          disabled={true}
                        />
                      </div>

                      <div className="g-mt6">
                        <Form.Input
                          label={this.formatMessage('admin.appBling.appToken')}
                          className="w-100 tracked-mega g-f1"
                          name="appToken"
                          value={this.state.appToken}
                          disabled={true}
                        />
                      </div>
                    </Container>
                  </>
                )}
              </Form>

              <div className="flex justify-between">
                <Link className="dn dib-ns link" to="/admin/apps">
                  <Button style="secondary">
                    <FormattedMessage id="admin.appBling.buttonCancel" />
                  </Button>
                </Link>

                <Button
                  id="openModalGenerate"
                  className="fixed static-ns w-100 w-auto-ns bottom-0 left-0 z-999"
                  onClick={() => this.handleClickButton()}
                >
                  <FormattedMessage id="admin.appBling.buttonGenerate" />
                  {this.props.isLoadingGenerateAppCredentials && <IconSpinner animate />}
                </Button>
              </div>

              <Modal
                className="w-50-l"
                open={this.state.openModal}
                onClose={this.modalOnClose}
                showCloseIcon={true}
                centered={true}
              >
                <p className="ma0 g-f5 fw6 navy">
                  <FormattedMessage id="admin.appBling.confirm" />
                </p>

                <p className="ma0 g-pv4 g-f3 c-on-base-2">
                  <FormattedMessage id="admin.appBling.disclaimer" />
                </p>

                <div className="flex justify-between">
                  <Button onClick={this.modalOnClose} style="secondary" className="dn dib-ns link">
                    <FormattedMessage id="admin.appBling.buttonCancel" />
                  </Button>

                  <Form.SubmitButton
                    id="carrierSubmit"
                    formId="FormId"
                    disabled={this.props.isLoadingGenerateAppCredentials}
                    className="fixed static-ns w-100 w-auto-ns bottom-0 left-0 z-999"
                  >
                    <FormattedMessage id="admin.appBling.buttonGenerate" />
                    {this.props.isLoadingGenerateAppCredentials && <IconSpinner animate />}
                  </Form.SubmitButton>
                </div>
              </Modal>
            </div>
          )}
        </TemplatePage.Content>
      </TemplatePage>
    )
  }
}

export default BlingForm
