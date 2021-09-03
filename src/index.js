const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')
require('./db/mongoose')  //make sure that the mongoose file is loaded when this file runs

const app = express()
const port = process.env.PORT

// app.use((req, res, next) => {
//     res.status(503).send('Site under maintenance, please try again later!')
// })

app.use(express.json()) // vvv. imp wasted 100 mins on this
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})