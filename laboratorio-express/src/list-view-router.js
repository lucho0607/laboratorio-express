const express = require('express');
const TaskList = require('./BD');
const router = express.Router();
router.use (express.json());

router.use = (req, res, next) => {
   const params = req.params
   if (!params || !params._id) {
       res.status(400).send("Parametro incorrecto =(")
   }
   next()
} 

router.get('/:isCompleted',(req,res)=>{
   const isCompleted = req.params.isCompleted;

   const task = TaskList.filter ((element)=>element.isCompleted == isCompleted);
   if ( task == undefined) {
      res.status(404).send('undefined')
   }else{res.status(200).send(task);
   } 
   
});
router.get('/',(req,res)=>{
   res.send(TaskList)
})



module.exports=router;