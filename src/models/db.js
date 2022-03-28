const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const saltRounds = 12

const users = [
    {id: uuidv4(), firstName: "oui-oui", lastName: "zeubi", password: bcrypt.hashSync('xoxo', saltRounds), role: "ADMIN"},
    {id: uuidv4(), firstName: "non-non", lastName: "zeubi", password: bcrypt.hashSync('blbl', saltRounds), role: "MEMBER"},
    {id: uuidv4(), firstName: "wesh-wesh", lastName: "zeubi", password: bcrypt.hashSync('jtbz', saltRounds), role: "MEMBER"},
]

exports.users = users;