const axios = require('axios')
const Address = require('../models/Address')
const token = "e170099f86764b5e99f26c61a2ad8ed2"
const bitcoin = require('bitcoinjs-lib')
const bigi = require('bigi')
const buffer = require('buffer')

//use axios to get balance from BlockCypher API
module.exports.getBalance = (req, res) => {
    let {addrs} = req.params
    if(addrs) {
        axios.get(`https://api.blockcypher.com/v1/bcy/test/addrs/${addrs}/balance`)
        .then(result => {
            if(result) res.send(result.data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).send("Cannot find address")
        })
    }
}

module.exports.generateAddress = (req, res) => {
    axios.post(`https://api.blockcypher.com/v1/bcy/test/addrs?token=`+token)
    .then(d => {
        if(d) {
        let {private, public, address, wif} = d.data
        genAddrs(address, private, public, wif)
        res.send({address: address, private: private, public : public, wif: wif})
        }
        
    })
    .catch(err => {
        console.log(err)
        res.status(404).send("Cannot find address")
    })
}

module.exports.createTransaction = (req, res) => {

    let {sender, receiver, amount} = req.body
    let keys = bitcoin.ECPair.fromPrivateKey(new buffer.Buffer("30d6fa9b295aab985116147a7545789c1ec13d758262f8196a20d00b008cc13f", 'hex'))
    var newtx = {
        inputs: [{addresses: [sender]}],
        outputs: [{addresses: [receiver], value: parseInt(amount)}]
      };

    axios.post('https://api.blockcypher.com/v1/bcy/test/txs/new?includeToSignTx=true', JSON.stringify(newtx))
    .then(tmptx => {
    })
    .catch(err => console.log(err))
}

module.exports.decodeToSign = (req, res) => {
    let {tosign_tx} = req.body
    let decodetx = JSON.stringify({
        tx: tosign_tx
    })
    console.log(decodetx)
    axios.post('https://api.blockcypher.com/v1/bcy/test/txs/decode', 
    decodetx
    ).then(
        d => {
            console.log(d)
        }
    ).catch(err => console.log(err))
}


module.exports.pushRaw = (req, res) => {
    var pushtx = {
        tx : "01000000015aaf03d92a5ef21dc8e157b6f5b5f303c8d8dd9aceefae3ca9572d5555d95c87000000001976a914514b9ca77e78ec7a567df504411998557d34829588acffffffff02b80b0000000000001976a91426fecb8f529f5d0a464498d0bc63ebc0b068508788acd0330100000000001976a914514b9ca77e78ec7a567df504411998557d34829588ac0000000001000000"
    }

    axios.post('https://api.blockcypher.com/v1/bcy/test/txs/push', JSON.stringify(pushtx))
    .then(d => console.log(d))
    .catch(err => console.log(err))
}

module.exports.funding = (req, res) => {
    let {addrs} = req.body
    let data = {"address": addrs, "amount": 100000}
    axios.post(`https://api.blockcypher.com/v1/bcy/test/faucet?token=${token}`, JSON.stringify(data))
    .then(
        d => res.send({msg: "Sucessfully funded!!!"})
    )
    .catch(err => {console.log(err)})
}

const genAddrs = (address, privateK, publicK, wif) => {
    return new Address({
        address: address,
        privateKey: privateK,
        publicKey: publicK,
        wif: wif
    }).save()
}   