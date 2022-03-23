const express = require('express')
const app = express()
const port = 3000
const users = require('./route')

app.use(express.json())
app.use('/users', users)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})