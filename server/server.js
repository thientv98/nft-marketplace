const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: '.env.production' });
} else if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: '.env.development' });
} else {
  require("dotenv").config();
}

// mongoose connect
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// router
require('./routes/index')(app)
require('./routes/admin')(app)
app.use(express.static('public'))

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.status(404).json('404 Not found')
})

const PORT = (process.env.PORT || 50667)
app.listen(PORT, () => {
  console.log('Server is running on Port:', PORT)
})
