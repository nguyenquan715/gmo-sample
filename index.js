import 'dotenv/config'
import { createServer } from 'http'
import express from 'express'
import * as GmoPaymentService from '@root/services/gmo-payment.service'
import * as GmoMemberService from '@root/services/gmo-member.service'
import { GMO_JOB_CODE, GMO_PAYMENT_METHOD, GMO_SEQ_MODE } from './helpers/constants'
import { ethers } from 'ethers'
import { createSmartAccount, sendTransaction } from '@root/services/bico-relayer.service'

const app = express()
const port = 5000
const host = 'localhost'
const server = createServer(app)
server.listen(port, () => {
  console.log(`Listening dapp: http://${host}:${port}`)
})

// const main = async () => {
//   try {
//     const res = await GmoPaymentService.getPaymentUrl()
//     console.log(res.data, res.status, res.statusText)
//   } catch (err) {
//     console.log(err.response.data)
//   }
// }

// main()

const buyNft = async () => {
  try {
    console.log('Start')
    const marketInterface = new ethers.utils.Interface(['function buy(uint256 tokenId_)'])
    const marketAddress = '0x4eF00F819FAA90d516a063acAc5D69282a180eC4'
    const data = marketInterface.encodeFunctionData('buy', [10000000042882])
    const price = ethers.utils.parseEther('0.001')

    const smartAccount = await createSmartAccount()
    await sendTransaction(smartAccount, marketAddress, data, price)
    console.log('End')
  } catch (err) {
    console.log(err)
  }
}

const transferToken = async (smartAccount) => {
  const to = '0x814b281c81A945e2a38058eA0d36271eD07B524e'
  const data = '0x'
  const value = ethers.utils.parseEther('0.00001')

  const txReceipt = await sendTransaction(smartAccount, to, data, value)
  return txReceipt
}

const main = async (times) => {
  const smartAccount = await createSmartAccount()
  const now = Date.now()
  for (let i = 0; i < times; i += 1) {
    setTimeout(async () => {
      console.log('Send transaction ', i + 1)
      const tx = await transferToken(smartAccount).catch((err) => console.log(`${i + 1}: ${err.message}`))
      console.log(i + 1, Date.now() - now, tx.receipt.from, tx.receipt.transactionHash)
    }, 500)
  }
}

main(5)
