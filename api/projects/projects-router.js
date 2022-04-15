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
    const {name, description} = req.body

    try{
        const newProject = await Projects.insert({name: name, description: description, completed: true})
        res.status(201).json(newProject)
    }catch(err){
        next(err)
    }
    // const newProject = await Projects.insert({name: name, description: description, completed: true })
    // const {id} = newProject
    // const project = await Projects.get(id)
    // res.status(201).json(project)
})

router.put('/:id', validateId, validateBody, async (req, res, next) => {
    const {name, description} = req.body
     
    try{
        const projectChange = await Projects.update(req.params.id, {name: name, description: description, completed: true})
        res.status(200).json(projectChange)
    }catch(err){
        next(err)
    }

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