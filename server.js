if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

 //import routes
const indexRouter = require('./routes/index')




//EJS setup 
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/normal')
app.use(expressLayouts)
app.use(express.static('public'))
// // // //

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

//use routes
app.use('/', indexRouter)


//Listening in port
app.listen(process.env.PORT || 6009, ()=>console.log(`started on port ${process.env.PORT}`))