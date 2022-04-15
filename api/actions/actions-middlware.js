// add middlewares here related to actions
const Actions = require('./actions-model')

function validateId(req, res, next) {}
function validateBody(req, res, next) {}

module.exports = {
    validateId,
    validateBody
}