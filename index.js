const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const users = require('./route')

app.use(cors({
    origin: ['http://localhost:63342']
}))
app.use(express.json())
app.use('/users', users)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})