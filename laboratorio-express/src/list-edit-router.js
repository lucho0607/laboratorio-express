const express = require('express');
const TaskList = require('./BD');
const edit = express.Router();
edit.use(express.json())

edit.use((req, res, next) => {
    if (req.method == 'POST') {
        if (req.body.hasOwnProperty(title) && req.body.hasOwnProperty(isCompleted) && req.body.hasOwnProperty(description)) {
            next();
        } else { res.status(400).json('not found data in the body') }
    }else if (req.method == 'PUT'){
        if (req.body.hasOwnProperty(title) ||req.body.hasOwnProperty(isCompleted) || req.body.hasOwnProperty(description)) {
         res.status(400).json('not found data in the body')
         next();
       
        }else{
         res.status(400).json('not found data in the body')

        }
    }
next();
})


edit.post('/', (req, res) => {
    const agregate = req.body;
    TaskList.push(agregate);
    res.status(201).send(TaskList);
    return agregate
})



edit.put('/:idTask', (req, res) => {
    const idTask = req.params.idTask

    const find = TaskList.findIndex((element) => element.id == idTask);
    if (find == -1) {
        res.status(404).send('undefined')
    } else (TaskList[find] = req.body)
    res.status(201).send('tarea actualizada')
})


edit.delete('/:idTask', (req, res) => {
    const idTask = req.params.idTask

    const find = TaskList.findIndex((element) => element.id == idTask);
    if (find == -1) {
        res.status(404).send('undefined')
    } else (TaskList.splice(find, 1))
    res.status(201).send('tarea eliminada')
})



module.exports = edit;