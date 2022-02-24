const express = require('express');
const path = require('path')
const app = express()
const port = process.env.PORT || 4545

//--------------Rollbar---------------
// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '7ff54d89a58440e3b01e2fbc4156043c',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
//-----------------------------

app.use(express.static(path.join(__dirname,'../public')))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

let students = []
app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('student was added successfully',{author:'Cole',type:'manual',student: name})

    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});