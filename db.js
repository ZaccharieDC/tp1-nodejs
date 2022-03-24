const { v4: uuidv4 } = require('uuid');

const users = [
    {id: uuidv4(), firstname: "oui-oui", lastname: "zeubi", password: "1234"},
    {id: uuidv4(), firstname: "non-non", lastname: "zeubi", password: "5678"},
    {id: uuidv4(), firstname: "wesh-wesh", lastname: "zeubi", password: "90123"},
]

module.exports = users