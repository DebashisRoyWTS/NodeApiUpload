const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const path = require('path')
const bodyParser = require('body-parser')

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const dbDriver =
  'mongodb+srv://debashis:R7KmV58sN3smMeN@cluster0.eihs8.mongodb.net/API'

const apiRoutes = require('./routes/crudApi.routes')
app.use('/api', apiRoutes)

const port = process.env.PORT || 2023

mongoose
  .connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log('DB is connected')
      console.log(`Server is Running @ http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log('Error')
  })