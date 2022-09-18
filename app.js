const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const routes = require('./routes')

const db = require('./models')
const Todo = db.Todo
const User = db.User

const { authenticator } = require('./middleware/auth')

const usePassport = require('./config/passport')
const passport = require('passport')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(routes)

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// app.use('/todos', authenticator, todos) 

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use((req, res, next) => {
  return next()
})

usePassport(app)




app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})