const users = require('../db')
const md5 = require('md5')

const getUsers = function() {
    return users
}

const getUserByFirstname = function(firstname) {
    return users.find(user => firstname == user.firstname)
}

const createUser = function(data) {
    data.password = md5(data.password)
    users.push(data)
}

const updateUser = function(id, data) {
    data.password = md5(data.password)
    users.splice(id, 1, data)
}

const deleteUser = function(id) {
    users.splice(id, 1)
}

module.exports = {
    getUsers,
    getUserByFirstname,
    createUser,
    updateUser,
    deleteUser,
}