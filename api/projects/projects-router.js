// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {

})

router.get('/:id', (req, res, next) => {

})

router.post('/', (req, res, next) => {

})

router.put('/:id', (req, res, next) => {

})

router.delete('/:id', (req, res, next) => {

})

router.get('/:id/actions', (req, res, next) => {

})

router.use((err, req, res, next) => {// eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message || "Whoops, looks like the internet broke!",
        stack: err.stack
    })
})

module.exports = router