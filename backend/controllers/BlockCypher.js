const axios = require('axios')
const Address = require('../models/Address')
const token = "e170099f86764b5e99f26c61a2ad8ed2"

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
    axios.post('https://api.blockcypher.com/v1/bcy/test/addrs?token=' + token)
    .then(d => {
        if(d) {
        let {private, public, address, wif} = d.data
        genAddrs(address, private, public, wif)
        res.send({address: address})
        }
        
    }).catch(err => {
        console.log(err)
        res.status(404).send("Cannot find address")
    })
}

module.exports.funding = (req, res) => {
    let {addrs} = req.body
    let data = {"address": addrs, "amount": 100000}
    axios.post(`https://api.blockcypher.com/v1/bcy/test/faucet?token=${token}`, JSON.stringify(data))
    .then(
        d => res.send({msg: "Sucessfully funded!!!"})
    ).catch(err => {console.log(err)})
}

const genAddrs = (address, privateK, publicK, wif) => {
    return new Address({
        address: address,
        privateKey: privateK,
        publicKey: publicK,
        wif: wif
    }).save()
}   