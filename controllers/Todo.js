const mongoose = require('mongoose')
const User = require('../models/User')
const Todo = require('../models/Todo')


const addTodo = async(req, res) =>{
    try{
        const user = await User.findById(req.user.id)
        const newTodo = await Todo.create(req.body) 
        if(user){
            user.todos.push(newTodo)
            user.save()
            res.json({message: 'todo added  successfully',  todos: user.todos})
        }else{
            res.json({message: "user not found!"})
        }
    }catch(err){
        console.log(err);
    }
}

const editTodo = async(req, res) => {
    try{
        const getTodo = await Todo.findByIdAndUpdate(req.params.id, req.body)
        res.json({message: 'todo Updated Successfully!'})
        if(getTodo){

        }
        
    }catch(err){
        console.log(err);
    }
}

const getUsersTodos = async(req, res) => {
    try{
        const user = await User.findById(req.user.id)
        const  usersTodos = user.todos
        res.json({todos: usersTodos})
    } catch (err) {
        res.json(err)
    }
}

const deleteTodo = async(req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.json({message: 'Todo Deleted Successfully'})
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    getUsersTodos,
    addTodo,
    editTodo,
    deleteTodo
}