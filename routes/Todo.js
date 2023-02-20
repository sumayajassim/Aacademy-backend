const express = require('express')
const router = express.Router()
const todoController = require('../controllers/Todo')
const isLoggedIn = require('../helper/isLoggedIn')

router.get('/todo', isLoggedIn, todoController.getUsersTodos)
router.post('/todo', isLoggedIn, todoController.addTodo)
router.put('/todo/:id', isLoggedIn, todoController.editTodo)
router.delete('/todo/:id', isLoggedIn, todoController.deleteTodo)

module.exports = router