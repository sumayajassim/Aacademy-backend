const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userModel = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
},{
    timestamps: true
})

const User = mongoose.model('User', userModel)

module.exports = User
