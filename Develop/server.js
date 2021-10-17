const express = require('express')
const DBconnect = require('./config/database')

const app = express()
const PORT = 4444

DBconnect()

app.use(express.json())
app.use('/api', require('./routes/apiRoutes'))

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}...`)
})