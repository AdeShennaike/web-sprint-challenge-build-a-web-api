// add middlewares here related to actions
const Actions = require('./actions-model')

function validateId(req, res, next) {
    Actions.get(req.params.id)
    .then(action => {
        if(!action){
            res.status(404).json({message: 'Action not found'})
        }else{
            next()
        }
    }) 
}

function validateBody(req, res, next) {
    const {project_id, description, notes, completed} = req.body
    
    if(!notes || !description || completed === undefined){
        res.status(400).json({ 
            message: "body is missing any of the required"})
    }else{
        next()
    }
}
module.exports = {
    validateId,
    validateBody
}