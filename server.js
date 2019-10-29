const express = require('express');
const app = express();
const session = require('express-session');

const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const multer = require('multer')
const upload = multer({dest: 'uploads/'});
require('./db/db');

app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const portfoliosController = require('./controllers/portfolios.js');
app.use('/portfolios', portfoliosController);

app.get('/', (req,res) => {
    res.render('index.ejs')
});

app.post('/single', upload.single('portfolio'), (req, res) =>{
    try {
        res.send(req.file);
    }catch(err){
        console.log(err)
    }
})

app.listen(3000, () => {
    console.log('server listening on port', 3000);
  });