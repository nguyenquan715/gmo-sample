import 'dotenv/config'
import { createServer } from 'http'
import express from 'express'
import * as GmoPaymentService from '@root/services/gmo-payment.service'
import * as GmoMemberService from '@root/services/gmo-member.service'
import { GMO_JOB_CODE, GMO_PAYMENT_METHOD, GMO_SEQ_MODE } from './helpers/constants'

const app = express()
const port = 5000
const host = 'localhost'
const server = createServer(app)
server.listen(port, () => {
  console.log(`Listening dapp: http://${host}:${port}`)
})

const main = async () => {
  // const res = await GmoPaymentService.registerTransaction('00004', GMO_JOB_CODE.AUTHORIZATION, 1000)
  // console.log(res)
  // const { accessID, accessPass } = res.data
  const res = await GmoPaymentService.getTransactionByOrderId('ORDER00001')
  console.log(res.data)
  const { accessID, accessPass } = res.data
  const txInfo = {
    accessID,
    accessPass,
    orderID: 'ORDER00001',
    chargeMethod: GMO_PAYMENT_METHOD.BULK,
  }
  const res1 = await GmoPaymentService.executeTransactionUsingMemberId(txInfo, 'MEM00001', 3)
  console.log(res1.data)
  // const token = 'cc865140cd3295ed4abceb3697734065f11dc1d838c4cb4c9cd5b94aa4dc012a'
  // const txInfo = {
  //   accessID,
  //   accessPass,
  //   orderID: 'ORDER00003',
  //   chargeMethod: GMO_PAYMENT_METHOD.BULK,
  // }
  // const res1 = await GmoPaymentService.executeTransactionUsingToken(txInfo, token)
  // console.log(res1.data)
  // const res1 = await GmoPaymentService.alterTransaction(accessID, accessPass, GMO_JOB_CODE.CANCEL, 1000)
  // console.log(res1.data)
  // const token = '327a0993bea89801b02b9ef2b6f7ead7ed009c36bfbe578c32954c4c2669d949'
  // const res = await GmoMemberService.saveCard('MEM00001', token)
  // console.log(res.data)

  // const res = await GmoMemberService.saveCard(
  //   'MEM00001',
  //   'b8ad5f01f3c1337b72672d61fc407ec6d5dee004c6eb132127005615cdfc2af1'
  // )
  // const res = await GmoMemberService.searchCard('MEM00001')
  // console.log(res.data)
}

main()
