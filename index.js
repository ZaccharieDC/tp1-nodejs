const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const routes = require('./Routes/UserRoutes')

app.use(cors({
    origin: ['http://localhost:63342']
}))
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})