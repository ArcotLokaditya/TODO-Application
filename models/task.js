const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    Description:{
        type: String,
        required: true
    },
    Category:{
        type: String,
        required: true
    },
    Due_date:{
        type: Date,
        required: true
    }
});

const Task = mongoose.model('task',taskSchema);

module.exports = Task;