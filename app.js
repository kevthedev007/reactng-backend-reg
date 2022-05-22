const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const createError = require('http-errors');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected!!');
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});


const app = express();

//importing routes
const user = require("./routes/user.route")

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

//adding middlewares
app.use(cors({
  origin: '*'
}))
app.use(bodyParser.urlencoded({ extended: false, limit: '60mb' }))
app.use(bodyParser.json({ limit: '50mb' }))

//routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to backreg-auth' })
})
app.use('/user', user)

app.use((req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

let port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started at port ${port}`)
})

