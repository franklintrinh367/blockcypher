const router = require('express').Router()
const bcCon = require('./controllers/BlockCypher')

router.get('/getBalance/:addrs', bcCon.getBalance)

router.post('/generateAddress', bcCon.generateAddress)

router.post('/funding', bcCon.funding)

router.post('/createTrans', bcCon.createTransaction)

router.post('/decode', bcCon.decodeToSign)

router.post('/pushRaw', bcCon.pushRaw)

module.exports = router