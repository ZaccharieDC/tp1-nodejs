const { v4: uuidv4 } = require('uuid')
const md5 = require('md5')

const users = [
    {id: uuidv4(), firstname: "oui-oui", lastname: "zeubi", password: md5("1234")},
    {id: uuidv4(), firstname: "non-non", lastname: "zeubi", password: md5("5678")},
    {id: uuidv4(), firstname: "wesh-wesh", lastname: "zeubi", password: md5("90123")},
]

module.exports = users