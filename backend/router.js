const router = require('express').Router()
const bcCon = require('./controllers/BlockCypher')

router.get('/getBalance/:addrs', bcCon.getBalance)

router.post('/generateAddress', bcCon.generateAddress)

router.post('/funding', bcCon.funding)

module.exports = router