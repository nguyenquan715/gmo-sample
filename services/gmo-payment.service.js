import axios from 'axios'
import { GMO_BASE_URL, GMO_SEQ_MODE } from '@root/helpers/constants'

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
