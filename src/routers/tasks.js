const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth ,async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({ 
        ...req.body, //copies all the properties on body (ES6 feature)
        owner: req.user._id,
     })

    try{
       await task.save()
       res.status(201).send(task)
    }catch(e){
       res.status(400).send()
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

// Get tasks?completed=true
router.get('/tasks', auth , async(req, res) => {
    const match = {}
    
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    
    try{
        //const tasks = await Task.find({})
        await req.user.populate({ 
            path:'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
         }).execPopulate() //same thing as above
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch(() => {
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', auth , async (req, res) => {
    const _id = req.params.id
    try{
        //const task = await Task.findById(_id)

        const task = await Task.findOne({ _id , owner: req.user._id })
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    }catch(e){
        res.status(500).send()
    }
    
    // Task.findById(_taskId).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id', auth , async (req,res) => {
    const allowedTasks = ['description' , 'completed']
    const attemptedUpdates = Object.keys(req.body)
    const isValidTasksUpdates = attemptedUpdates.every((updates) => {
        return allowedTasks.includes(updates)
    }) 

    if(!isValidTasksUpdates){
        return res.status(400).send({ error: 'invalid task update!' })
    }

    try{
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true})
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id:req.params.id , owner:req.user._id })

        if(!task){
            return res.status(404).send()
        }

        attemptedUpdates.forEach((updates) => task[updates] = req.body[updates])
        await task.save()

        res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id' ,auth, async (req,res) => {
    try{
        //const deletedTask = await Task.findByIdAndDelete(req.params.id)
        const deletedTask = await Task.findOneAndDelete({ _id:req.params.id, owner :req.user._id })
        if(!deletedTask){
            return res.status(404).send()
        }

        res.send(deletedTask)
    } catch (e) {
        res.status(500).send(e)

    }
})


module.exports = router