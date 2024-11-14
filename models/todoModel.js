const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
