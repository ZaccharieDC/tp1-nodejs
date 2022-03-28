const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const saltRounds = 12

const users = [
    {id: uuidv4(), firstName: "oui-oui", lastName: "zeubi", password: bcrypt.hashSync('xoxo', saltRounds)},
    {id: uuidv4(), firstName: "non-non", lastName: "zeubi", password: bcrypt.hashSync('blbl', saltRounds)},
    {id: uuidv4(), firstName: "wesh-wesh", lastName: "zeubi", password: bcrypt.hashSync('jtbz', saltRounds)},
]

exports.users = users;