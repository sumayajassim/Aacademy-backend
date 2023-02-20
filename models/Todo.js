const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoModel = new Schema({
    status: {type: String,
            enum: {
            values: ['COMPLETED', 'UNCOMPLETED'],
            default: 'UNCOMPLETED',
            message: '{VALUE} is not supported',
        }},
    title: {type: String, required: true},
    time: {type: String, required: true}
})


const Todo =  mongoose.model('Todo',  TodoModel)
module.exports = Todo
