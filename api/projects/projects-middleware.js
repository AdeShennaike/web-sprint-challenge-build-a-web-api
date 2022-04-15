// add middlewares here related to projects
const Projects = require('./projects-model')

function validateId(req, res, next) {
    Projects.get(req.params.id)
    .then(project => {
        if(!project){
            res.status(404).json({message: 'Project not found'})
        }else{
            next()
        }
    }) 
}

function validateBody(req, res, next) {
    const {name, description} = req.body
    
    if(!name || !description){
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