const express = require('express')
const jwt = require('express-jwt')
const date = require('date-and-time')
const router = express.Router()
const userRepository = require('./Repository/UserRepository')

// middleware that is specific to this router
router.use(function log(req, res, next) {
    start = new Date()
    console.log(start.toLocaleString());
    console.log(`${req.method}     ${req.hostname}${req.baseUrl}${req.path}`)
    console.log(req.ip)
    next();
    console.log(date.subtract(new Date(), start).toMilliseconds(), 'ms')
});

router.use(jwt({
    secret: 'Wong Xi Fang Su Ha',
    algorithms: ['HS256'],
    // credentialsRequired: false
}));

router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

router.get('/', (req, res) => {
    res.status(200).send(userRepository.getUsers())
})

router.post('/', (req, res) => {
    userRepository.createUser(req.body)
    res.status(200).send('User created succesfully')
})

router.get('/:id', (req, res) => {
    res.status(200).send(userRepository.getUserById(req.params.id))
})

router.get('/:firstname', (req, res) => {
    res.status(200).send(userRepository.getUserByFirstname(req.params.firstname))
})

router.put('/:id', (req, res) => {
    userRepository.updateUser(req.params.id, req.body)
    res.status(200).send('User succesfully updated')
})

router.delete('/:id', (req, res) => {
    userRepository.deleteUser(req.params.id)
    res.status(200).send('User succesfully deleted')
})

module.exports = router