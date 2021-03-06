const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoDBStore = require('connect-mongodb-session')(session)

var handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs',handlebars({
  layoutsDir : `${__dirname}/views/layouts`,
  extname: 'hbs',
  defaultLayout: 'main',
}));


const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/shopping-card';
mongoose.connect(url, {  useUnifiedTopology: true , useNewUrlParser: true });
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
});
db.on('error', err => {
  console.error('connection error:', err)
});

app.use('/',express.static(path.join(__dirname+'/public')));
app.use('/dist',express.static(path.join(__dirname,'/bower_components/jquery/dist')));
app.use('/bootstrap',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')));
//   find js/bootstrap.min.js
app.use('/js',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/js'))); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const store = new mongoDBStore({
  uri: url,
  collection: 'cardSession'
})

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ---------------------------------------------
app.use(function(req,res,next){
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  res.locals.login = req.isAuthenticated()
  res.locals.user = req.user // set this after passport.session()
  res.locals.store = req.session
  next();
});
require('./config/password')();

app.use('/',require('./routes/products-route'));
app.use('/users',require('./routes/profile-route'));
app.use('/users',require('./routes/user'));
app.use('/users',require('./routes/register'))

app.use((req,res,next)=>{
  const error = new Error('Not found');
  res.render('404',{error: error.message})
})

app.listen(3000,(req,res)=>{
    console.log('your app is listening port on 30000..')
});
