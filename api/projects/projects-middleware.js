// add middlewares here related to projects
const Projects = require('./projects-model')

function validateId(req, res, next) {
    
 console.log(validateId)
 next()
}

function validateBody(req, res, next) {
 console.log(validateBody)
 next()    
}

module.exports = {
    validateId,
    validateBody
}