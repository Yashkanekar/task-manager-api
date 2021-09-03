const mongoose = require('mongoose')
const validator = require('validator')


const taskSchema = new mongoose.Schema({
    description: {
       type: String,
       required: true,
       trim: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: false,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
},{
    timestamps:true,
})
const Tasks = mongoose.model('Task', taskSchema )
module.exports = Tasks

// const myTask = new Tasks({
//     description:'Finishing the node course',
// })

// myTask.save().then(() => {
//      console.log(myTask)
// }).catch((error) => {
//      console.log('Error!', error)
// })
