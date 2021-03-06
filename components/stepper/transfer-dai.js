import React, { useState } from 'react'
import { BounceLoader } from 'react-spinners'
import {
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography
} from '@material-ui/core'
import { useRouter } from 'next/router'

export default function TransferDAI ({
  web3,
  tokenAmount,
  account,
  multipleArbitrableTokenContract,
  networkName,
  envData,
  cid
}) {
  const router = useRouter()
  const [buttonView, setButtonView] = useState(true)
  const [isPending, setIsPending] = useState(false)
  const [isOngoing, setIsOngoing] = useState(false)
  const [txError, setTXerror] = useState(false)
  const [isAgree, setIsagree] = useState(false)
  const [txId, setTxId] = useState('')
  const [isOpen, setOpen] = useState(false)

  const handleClickOpen = (event) => {
    event.preventDefault()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const transfer = async () => {
    if (isAgree) {
      setTXerror(false)
      setIsPending(true)
      setIsOngoing(false)
      setButtonView(false)

      const data = multipleArbitrableTokenContract.methods
        .createTransaction(
          tokenAmount,
          envData.ERC_TOKEN,
          envData.TIMEOUTPAYMENT.toString(),
          envData.RECEIVER,
          cid)
        .encodeABI()
      const transactionParameters = {
        to: envData.MULTIPLE_ARBITRABLE_CONTRACT_ADDRESS, // Required except during contract publications.
        from: account, // must match user's active address.
        data: data
      }

      web3.eth
        .sendTransaction(transactionParameters)
        .on('transactionHash', (hash) => {
          setIsOngoing(true)
          setTxId(hash)
        })
        .once('confirmation', (confirmationNumber, receipt) => {
          if (receipt.status) {
            router.push('/loserbox-confirmation')
          }
        })
        .on('error', (error) => {
          console.error('error', error)
          setIsOngoing(false)
          setIsPending(true)
          setTXerror(true)
        })
    }
  }

  const linkFun = () => {
    return (
      <a
        href='#'
        style={{ color: 'black', textDecoration: 'underline' }}
        onClick={handleClickOpen}
      >
        I agree the terms of the contract.
      </a>
    )
  }
  return (
    <div style={{ paddingTop: 50 }}>
      <div className='row form-group' style={{ padding: '.375rem .75rem' }}>
        <h4>
          <span style={{ color: '#13a2dc' }}>Transfer</span> DAI to the Escrow
        </h4>
      </div>
      <FormControlLabel
        control={
          <Checkbox
            checked={isAgree}
            onChange={() => setIsagree(!isAgree)}
            name='isAgree'
            color='primary'
          />
        }
        label={linkFun()}
      />
      <div className='row'>
        <div className='col-md-12'>
          <div
            className='alert btns'
            style={{ background: '#A6FFCC' }}
            role='alert'
          >
            <p style={{ paddingTop: '15px' }}>
              To transfer the fund to the escrow you have to approve the escrow
              smart contract to handle the fund.
            </p>
          </div>
          {buttonView || txError
            ? (
              <button
                className='new-button'
                onClick={transfer}
                style={{
                  width: '100%',
                  marginTop: '20px',
                  backgroundColor: '#A6FFCC'
                }}
                type='button'
                disabled={!isAgree}
              >
                <strong>Transfer DAI To Escrow</strong>
              </button>
              )
            : null}

          {isPending
            ? (
              <div
                className='pendingBox'
                onClick={() =>
                  window.open(`https://${networkName === '' ? '' : (networkName + '.')}etherscan.io/tx/${txId}`)}
              >
                <div className='pending'>
                  <div>
                    {(isPending || isOngoing) && !txError
                      ? 'Transaction pending...'
                      : null}
                    {txError ? 'Transaction rejected. Please try again.' : null}
                  </div>
                  <div>
                    {isOngoing ? <BounceLoader size={50} color='#fff' /> : null}
                  </div>
                </div>
              </div>
              )
            : null}
        </div>
      </div>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            Terms of the Contract
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                at diam et nibh condimentum ornare. Maecenas faucibus dolor
                eros, a suscipit neque eleifend in. Vestibulum vehicula elit
                lacus, nec efficitur orci auctor ac. Vestibulum dignissim nunc a
                dictum suscipit. Duis sollicitudin sagittis faucibus. Aenean mi
                libero, sagittis in gravida et, gravida in tortor. Pellentesque
                augue massa, aliquet eget ante ut, tincidunt lacinia metus. Cras
                orci ex, egestas a ornare et, cursus non risus. Suspendisse
                lobortis metus id magna pharetra, quis consectetur risus
                bibendum.
              </Typography>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                at diam et nibh condimentum ornare. Maecenas faucibus dolor
                eros, a suscipit neque eleifend in. Vestibulum vehicula elit
                lacus, nec efficitur orci auctor ac. Vestibulum dignissim nunc a
                dictum suscipit. Duis sollicitudin sagittis faucibus. Aenean mi
                libero, sagittis in gravida et, gravida in tortor. Pellentesque
                augue massa, aliquet eget ante ut, tincidunt lacinia metus. Cras
                orci ex, egestas a ornare et, cursus non risus. Suspendisse
                lobortis metus id magna pharetra, quis consectetur risus
                bibendum.
              </Typography>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                at diam et nibh condimentum ornare. Maecenas faucibus dolor
                eros, a suscipit neque eleifend in. Vestibulum vehicula elit
                lacus, nec efficitur orci auctor ac. Vestibulum dignissim nunc a
                dictum suscipit. Duis sollicitudin sagittis faucibus. Aenean mi
                libero, sagittis in gravida et, gravida in tortor. Pellentesque
                augue massa, aliquet eget ante ut, tincidunt lacinia metus. Cras
                orci ex, egestas a ornare et, cursus non risus. Suspendisse
                lobortis metus id magna pharetra, quis consectetur risus
                bibendum.
              </Typography>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                at diam et nibh condimentum ornare. Maecenas faucibus dolor
                eros, a suscipit neque eleifend in. Vestibulum vehicula elit
                lacus, nec efficitur orci auctor ac. Vestibulum dignissim nunc a
                dictum suscipit. Duis sollicitudin sagittis faucibus. Aenean mi
                libero, sagittis in gravida et, gravida in tortor. Pellentesque
                augue massa, aliquet eget ante ut, tincidunt lacinia metus. Cras
                orci ex, egestas a ornare et, cursus non risus. Suspendisse
                lobortis metus id magna pharetra, quis consectetur risus
                bibendum.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}
