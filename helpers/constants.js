export const GMO_BASE_URL = 'https://pt01.mul-pay.jp/'

export const GMO_JOB_CODE = Object.freeze({
  CHECK: 'CHECK',
  INSTANT_CAPTURE: 'CAPTURE',
  AUTHORIZATION: 'AUTH',
  CANCEL: 'CANCEL',
  SALE_CAPTURE: 'SALES',
})

export const GMO_SEQ_MODE = Object.freeze({
  LOGICAL: 0,
  PHYSICAL: 1,
})

export const GMO_PAYMENT_METHOD = Object.freeze({
  BULK: 1,
  INSTALLATION: 2,
  BONUS: 3,
  REVOLVING: 5,
})
