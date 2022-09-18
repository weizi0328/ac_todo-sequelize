const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes')

const usePassport = require('./config/passport')

// const { authenticator } = require('./middleware/auth')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// app.use('/todos', authenticator, todos) 

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

// app.use((req, res, next) => {
//   return next()
// })

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})