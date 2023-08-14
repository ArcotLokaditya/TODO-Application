const express = require('express');
const { format } = require('date-fns');
const app = express();

const port = 8000;

const db = require('./config/mongoose');
const Task = require('./models/task');


app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(express.static("assets"));

app.get("/", async function(req,res){
    try {
        const tasks = await Task.find({});
        const formattedTasks = tasks.map(task => ({
            ...task._doc,
            Due_date: format(new Date(task.Due_date), 'MMM dd, yyyy')
        }));
        return res.render('home', {
            title: "TODO App",
            tasks: formattedTasks
        });
    } catch (error) {
        console.error(error);
    }
});

app.post("/new_task", function(req,res){

    Task.create({
        Description: req.body.Description,
        Category: req.body.Category,
        Due_date: req.body.Due_date
    });

    console.log('created successfully');
    return res.redirect('/')
    
});

app.get("/delete_selected_tasks", async function (req, res) {
    try {
        const selectedTasks = req.query.selectedTasks;

        await Task.deleteMany({ _id: { $in: selectedTasks } });
        console.log('Deleted selected tasks successfully');
        return res.redirect('/');
    } catch (error) {
        console.error('Error while deleting selected tasks', error);
        return res.sendStatus(500);
    }
});


app.listen(port,function(err){
    if(err){
        console.log(`Error in creating the server: ${err}`);
        return;
    }

    console.log(`Server up and running on: ${port}`);
});
