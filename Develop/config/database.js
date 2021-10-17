const mongoose = require('mongoose')

const DBconnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost/socialNetworkAPI', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Connected')
    } catch (error) {
        console.log('Failed to connect')
    }
}

module.exports = DBconnect