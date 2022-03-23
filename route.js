const express = require('express')
const router = express.Router()
const userRepository = require('./Repository/UserRepository')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

router.get('/', (req, res) => {
    res.send(userRepository.getUsers())
})

router.post('/', (req, res) => {
    userRepository.createUser(req.body)
    res.status(200).send('User created succesfully')
})

router.get('/:firstname', (req, res) => {
    res.send(userRepository.getUserByFirstname(req.params.firstname))
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