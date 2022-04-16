// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model')
const {validateId, validateBody} = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
    .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', validateId, (req, res, next) => {
    Actions.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', validateId, validateBody, async (req, res, next) => {
    const {project_id,  description, notes, completed} = req.body

    try{
        const newAction = await Actions.insert({project_id: project_id, description: description, notes: notes, completed: completed })
        const {id} = newAction
        const action = await Actions.get(id)
        res.status(201).json(action)
    }catch(err){
        next(err)
    }
})

router.put('/:id', validateId, validateBody, (req, res, next) => {

})

router.delete('/:id', validateId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            next(err)
        })
})

router.use((err, req, res, next) => {// eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message || "Whoops, looks like the internet broke!",
        stack: err.stack
    })
})

module.exports = router