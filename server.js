const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 4444

const DBconnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost/socialNetworkAPI', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`Connected and listening on PORT ${PORT}...`)
        })
    } catch (error) {
        console.log('Failed to connect => ', error.message)
    }
}
DBconnect()

app.use(express.json())
app.use('/api', require('./routes/routes'))