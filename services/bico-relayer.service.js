import { IBundler, Bundler } from '@biconomy/bundler'
import { DEFAULT_ENTRYPOINT_ADDRESS, BiconomySmartAccount, BiconomySmartAccountConfig } from '@biconomy/account'
import { Wallet, ethers } from 'ethers'
import { ChainId } from '@biconomy/core-types'

const bundler = new Bundler({
  bundlerUrl: process.env.BICO_BUNDLER_URL,
  chainId: ChainId.POLYGON_MUMBAI,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
})

const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC_URL)
const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY, provider)

const smartAccountConfig = {
  signer: wallet,
  chainId: ChainId.POLYGON_MUMBAI,
  bundler,
}
const biconomyAccount = new BiconomySmartAccount(smartAccountConfig)

export const createSmartAccount = async () => {
  const smartAccount = await biconomyAccount.init()
  console.log(`Owner: ${smartAccount.owner}`)
  console.log(`Smart account: ${await smartAccount.getSmartAccountAddress()}`)
  return smartAccount
}

export const sendTransaction = async (smartAccount, to, data, value) => {
  const transaction = {
    to,
    data,
    value,
  }
  const userOp = await smartAccount.buildUserOp([transaction])

  const userOpResponse = await smartAccount.sendUserOp(userOp)
  const transactionResponse = await userOpResponse.wait()
  return transactionResponse
}
