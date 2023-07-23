import axios from 'axios'
import { GMO_BASE_URL, GMO_SEQ_MODE } from '@root/helpers/constants'

export const registerMember = async (memberID) => {
  const params = {
    siteID: process.env.GMO_SITE_ID,
    sitePass: process.env.GMO_SITE_PASS,
    memberID,
  }
  const endpoint = `${GMO_BASE_URL}/payment/SaveMember.json`
  return axios.post(endpoint, params)
}

export const searchMember = async (memberID) => {
  const params = {
    siteID: process.env.GMO_SITE_ID,
    sitePass: process.env.GMO_SITE_PASS,
    memberID,
  }
  const endpoint = `${GMO_BASE_URL}/payment/SearchMember.json`
  return axios.post(endpoint, params)
}

export const deleteMember = async (memberID) => {
  const params = {
    siteID: process.env.GMO_SITE_ID,
    sitePass: process.env.GMO_SITE_PASS,
    memberID,
  }
  const endpoint = `${GMO_BASE_URL}/payment/DeleteMember.json`
  return axios.post(endpoint, params)
}

export const saveCard = async (memberID, token, cardSeq, seqMode = GMO_SEQ_MODE.LOGICAL) => {
  const params = {
    siteID: process.env.GMO_SITE_ID,
    sitePass: process.env.GMO_SITE_PASS,
    memberID,
    seqMode,
    token,
  }

  if (cardSeq != undefined) {
    params.cardSeq = cardSeq
  }

  const endpoint = `${GMO_BASE_URL}/payment/SaveCard.json`
  return axios.post(endpoint, params)
}

export const deleteCard = async (memberID, cardSeq, seqMode = GMO_SEQ_MODE.LOGICAL) => {
  const params = {
    siteID: process.env.GMO_SITE_ID,
    sitePass: process.env.GMO_SITE_PASSWORD,
    memberID,
    seqMode,
    cardSeq,
  }
  const endpoint = `${GMO_BASE_URL}/payment/DeleteCard.json`
  return axios.post(endpoint, params)
}

export const searchCard = async (memberID, cardSeq, seqMode = GMO_SEQ_MODE.LOGICAL) => {
  const params = {
    siteID: process.env.GMO_SITE_ID,
    sitePass: process.env.GMO_SITE_PASS,
    memberID,
    seqMode,
  }

  if (cardSeq) {
    params.cardSeq = cardSeq
  }
  const endpoint = `${GMO_BASE_URL}/payment/SearchCard.json`
  return axios.post(endpoint, params)
}
