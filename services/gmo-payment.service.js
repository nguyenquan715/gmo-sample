import axios from 'axios'
import { GMO_BASE_URL, GMO_JOB_CODE, GMO_PAYMENT_METHOD, GMO_SEQ_MODE } from '@root/helpers/constants'

export const registerTransaction = async (orderCount, jobCode, amount) => {
  console.log(process.env.GMO_SHOP_ID, process.env.GMO_SHOP_PASS)
  const params = {
    shopID: process.env.GMO_SHOP_ID,
    shopPass: process.env.GMO_SHOP_PASS,
    orderID: `ORDER${orderCount}`,
    jobCd: jobCode,
    amount,
  }
  const endpoint = `${GMO_BASE_URL}/payment/EntryTran.json`
  return axios.post(endpoint, params)
}

export const executeTransactionUsingToken = async (txInfo, token) => {
  const { accessID, accessPass, orderID, chargeMethod } = txInfo
  const params = {
    accessID,
    accessPass,
    orderID,
    siteID: process.env.GMO_SITE_ID,
    sitePass: process.env.GMO_SITE_PASS,
    method: chargeMethod,
    token,
  }
  const endpoint = `${GMO_BASE_URL}/payment/ExecTran.json`
  return axios.post(endpoint, params)
}

export const executeTransactionUsingMemberId = async (
  txInfo,
  memberID,
  cardSeq,
  cardPass,
  seqMode = GMO_SEQ_MODE.LOGICAL
) => {
  const { accessID, accessPass, orderID, chargeMethod } = txInfo
  const params = {
    accessID,
    accessPass,
    orderID,
    siteID: process.env.GMO_SITE_ID,
    sitePass: process.env.GMO_SITE_PASS,
    method: chargeMethod,
    memberID,
    seqMode,
    cardSeq,
  }
  if (cardPass) {
    params.cardPass = cardPass
  }
  const endpoint = `${GMO_BASE_URL}/payment/ExecTran.json`
  return axios.post(endpoint, params)
}

export const executeTransactionUsingCardNumber = async (txInfo, cardNumber, expireDate, holderName, securityCode) => {
  const { accessID, accessPass, orderID, chargeMethod } = txInfo
  const params = {
    accessID,
    accessPass,
    orderID,
    method: chargeMethod,
    cardNo: cardNumber,
    expire: expireDate,
  }

  if (holderName) {
    params.holderName = holderName
  }
  if (securityCode) {
    params.securityCode = securityCode
  }
  const endpoint = `${GMO_BASE_URL}/payment/ExecTran.json`
  return axios.post(endpoint, params)
}

export const alterTransaction = async (accessID, accessPass, jobCode, amount) => {
  const params = {
    shopID: process.env.GMO_SHOP_ID,
    shopPass: process.env.GMO_SHOP_PASS,
    accessID,
    accessPass,
    jobCd: jobCode,
    amount,
  }
  const endpoint = `${GMO_BASE_URL}/payment/AlterTran.json`
  return axios.post(endpoint, params)
}

export const getTransactionByOrderId = async (orderID, useSiteMaskLevel = 0, useFloatingMask = 0) => {
  const params = {
    shopID: process.env.GMO_SHOP_ID,
    shopPass: process.env.GMO_SHOP_PASS,
    orderID,
    useSiteMaskLevel,
    useFloatingMask,
  }
  const endpoint = `${GMO_BASE_URL}/payment/SearchTrade.json`
  return axios.post(endpoint, params)
}

export const getPaymentUrl = async () => {
  const endpoint = `${GMO_BASE_URL}/payment/GetLinkplusUrlPayment.json`
  const params = {
    geturlparam: {
      ShopID: process.env.GMO_SHOP_ID,
      ShopPass: process.env.GMO_SHOP_PASS,
    },
    configid: '1',
    transaction: {
      OrderID: 'ORDER000013',
      Amount: 1000,
      Tax: 20,
      Overview: 'This is overview of transaction',
      Detail: 'This is detail of transaction',
      PayMethods: ['credit'],
      RetUrl: 'https://market-dev.genso.game/official/treasure-box',
      ExpireDays: 0,
      // PaymentExpireDate: '202308251700',
      ResultSkipFlag: 1,
      TranDetailShowFlag: 1,
    },
    displaysetting: {
      TemplateID: 'designA',
      LogoUrl:
        'https://img.freepik.com/premium-vector/letter-cc-logo-design-abstract-letter-cc-logo-design_219523-125.jpg',
      ShopName: 'Gensokishi Marketplace',
      ColorPattern: 'yellow_01',
      Lang: 'en',
    },
    credit: {
      JobCd: GMO_JOB_CODE.AUTHORIZATION,
      Method: GMO_PAYMENT_METHOD.BULK,
      MemberID: 'MEM00002',
      SecCodeRequiredFlag: 1,
      RegistMemberID: 'MEM00002',
    },
  }
  return axios.post(endpoint, params)
}

export const getCardEditUrl = async () => {
  const endpoint = `${GMO_BASE_URL}/payment/GetLinkplusUrlMember.json`
  const params = {
    geturlparam: {
      ShopID: process.env.GMO_SHOP_ID,
      ShopPass: process.env.GMO_SHOP_PASS,
    },
    configid: '1',
    member: {
      MemberID: 'MEM00001',
      Cardeditno: '2',
      RetUrl: 'https://market-dev.genso.game/official/treasure-box',
      SecCodeRequiredFlag: 1,
      CardMaxCnt: 5,
      ResultSkipFlag: 0,
    },
    displaysetting: {
      LogoUrl:
        'https://img.freepik.com/premium-vector/letter-cc-logo-design-abstract-letter-cc-logo-design_219523-125.jpg',
      ShopName: 'Gensokishi Marketplace',
      ColorPattern: 'skyblue_01',
      Lang: 'en',
    },
    credit: {
      JobCd: GMO_JOB_CODE.AUTHORIZATION,
      Method: GMO_PAYMENT_METHOD.BULK,
      MemberID: 'MEM00002',
      SecCodeRequiredFlag: 1,
      RegistMemberID: 'MEM00002',
    },
  }
  return axios.post(endpoint, params)
}
