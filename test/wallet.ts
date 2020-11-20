import * as Transactions from '@waves/waves-transactions'
import * as Crypto from '@waves/ts-lib-crypto'
import Account from '../classes/Account'
import * as chalk from 'chalk'
import { expect } from 'chai'
import fetch from 'node-fetch'

const wvs = 10 ** 8
const waves = wavlets => wavlets * wvs
const wavlets = waves => waves / wvs

// needs to have at lest 2 waves
const dapp = new Account('liar neutral leopard dress rescue busy federal point theory wife mystery festival marble predict grace')
const testnetUrl = 'https://nodes-testnet.wavesnodes.com'
const assetId = 'ADjmdGLTMTX5HMJMdPEXSKqjrcGgTE8kCGbz75TP8rwo'

const account1 = new Account('lemon advance mutual student run suspect kitchen price palace survey tooth rotate true embark wreck')
const account2 = new Account('length claw flower easy banner orange cricket hello above castle math tattoo dune dilemma judge')

describe('wallet', () => {
  it('transfers tokens to account1', async () => {
    const params: Transactions.ITransferParams = {
      assetId,
      amount: 100,
      recipient: account1.address,
      chainId: 'T',
      fee: 900_000
    }
    const payload = Transactions.transfer(params, dapp.seed)
    const tx = await Transactions.broadcast(payload, testnetUrl)
    await Transactions.waitForTx(tx.id, { apiBase: testnetUrl })
  })

  it('transfers tokens to account2', async () => {
    const params: Transactions.ITransferParams = {
      assetId,
      amount: 100,
      recipient: account2.address,
      chainId: 'T',
      fee: 900_000
    }
    const payload = Transactions.transfer(params, dapp.seed)
    const tx = await Transactions.broadcast(payload, testnetUrl)
    await Transactions.waitForTx(tx.id, { apiBase: testnetUrl })
  })

  it('transfers waves to account1', async () => {
    const params: Transactions.ITransferParams = {
      amount: waves(0.1),
      recipient: account1.address,
      chainId: 'T',
      fee: 900_000
    }
    const payload = Transactions.transfer(params, dapp.seed)
    const tx = await Transactions.broadcast(payload, testnetUrl)
    await Transactions.waitForTx(tx.id, { apiBase: testnetUrl })
  })

  it('transfers waves to account2', async () => {
    const params: Transactions.ITransferParams = {
      amount: waves(0.1),
      recipient: account2.address,
      chainId: 'T',
      fee: 900_000
    }
    const payload = Transactions.transfer(params, dapp.seed)
    const tx = await Transactions.broadcast(payload, testnetUrl)
    await Transactions.waitForTx(tx.id, { apiBase: testnetUrl })
  })

  it('deposits tokens', async () => {
    const params: Transactions.IInvokeScriptParams = {
      dApp: dapp.address,
      call: {
        function: 'deposit',
        args: []
      },
      payment: [{ assetId: assetId, amount: 10 }],
      chainId: 'T'
    }
    const payload = Transactions.invokeScript(params, account1.seed)
    const tx = await Transactions.broadcast(payload, testnetUrl)
    await Transactions.waitForTx(tx.id, { apiBase: testnetUrl })
  })
})
