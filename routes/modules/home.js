const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')


router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then(todos => res.render('index', { todos: todos }))
    .catch(error => res.status(422).json(error))
})


module.exports = router