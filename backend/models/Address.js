const mongoose = require('mongoose')

const AddressSchema = mongoose.Schema({
    address: String,
    privateKey: String,
    publicKey: String,
    wif: String
})

module.exports = mongoose.model('addresses', AddressSchema)