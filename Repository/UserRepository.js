const users = require('../db')
const jwt = require('express-jwt')
const bcrypt = require('bcrypt')
const saltRounds = 12
const { v4: uuidv4 } = require('uuid')

const login = function(data) {
    const user = this.getUserByFirstname(data.firstname)
    bcrypt.compare(data.password, user.password, function(err, result) {
        if (result == false) {
            return
        }
        return jwt({
            secret: 'Wong Xi Fang Su Ha',
            algorithms: ['HS256'],
        })
    });
}

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
    bcrypt.hash(data.password, saltRounds, function(err, hash) {
        data.password = hash
    })
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
    login,
    getUsers,
    getUserById,
    getUserByFirstname,
    createUser,
    updateUser,
    deleteUser,
}