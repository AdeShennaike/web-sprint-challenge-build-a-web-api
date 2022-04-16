// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')

const {validateId, validateBody} = require('./projects-middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
    .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', validateId, (req, res, next) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', validateBody, async (req, res, next) => {
    const {name, description, completed} = req.body

    try{
        const newProject = await Projects.insert({name: name, description: description, completed: true })
        const {id} = newProject
        const project = await Projects.get(id)
        res.status(201).json(project)
    }catch(err){
        next(err)
    }
})

router.put('/:id', validateId, validateBody, async (req, res, next) => {
    const {name, description, completed} = req.body
     
    try{
        const projectChange = await Projects.update(req.params.id, {name: name, description: description, completed: completed})
        const {id} = projectChange
        const project = await Projects.get(id)
        res.status(200).json(project)
    }catch(err){
        next(err)
    }

})

router.delete('/:id', validateId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id/actions', validateId, async (req, res, next) => {
    try{
        const actions = await Projects.getProjectActions(req.params.id)
        console.log(actions)
        res.status(200).json(actions)
    }catch(err){
        next()
    }
})

router.use((err, req, res, next) => {// eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message || "Whoops, looks like the internet broke!",
        stack: err.stack
    })
})

module.exports = router