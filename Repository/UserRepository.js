const users = require('../db')
const md5 = require('md5')
const { v4: uuidv4 } = require('uuid');

const getUsers = function() {
    return users
}

const getUserById = function(id) {
    return users.find(user => id == user.id)
}

const getUserByFirstname = function(firstname) {
    return users.find(user => firstname == user.firstname)
}

const createUser = function(data) {
    data.id = uuidv4()
    data.password = md5(data.password)
    users.push(data)
}

const updateUser = function(id, data) {
    data.password = md5(data.password)
    users.splice(id-1, 1, data)
}

const deleteUser = function(id) {
    users.slice(id, 1)
}

module.exports = {
    getUsers,
    getUserById,
    getUserByFirstname,
    createUser,
    updateUser,
    deleteUser,
}