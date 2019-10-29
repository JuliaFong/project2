const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const Portfolio = require('../models/Portfolios');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    //First: find a user that has req.body.username
    //if they do exist, send message that says username taken
    //if not, create user
    const foundUser = await User.find({username : req.body.username})
    if(foundUser) {
        res.send('Username taken')
    } 
    console.log(' hello')
    const password = req.body.password
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const userDbEntry = {};
    userDbEntry.username = req.body.username;
    userDbEntry.password = passwordHash
    User.create(userDbEntry, (err, user) => {
        req.session.username = user.username;
        req.session.logged = true;
        res.redirect('/portfolios')
    });
})



router.get('/', async (req, res) =>{
    try {
        const foundUsers = await User.find();
        res.render('index.ejs', {
            users: foundUsers,
        });
    } catch(err){
        console.log(err);
    }
});

router.get('/:id', async (req,res) => {
    try{
        const foundUser = await User.findById(req.params.id)
        res.render('index.ejs', {
            users: foundUser,
        });
    } catch(err){
        next(err);
    }
});

router.get('/:id/edit', async (req, res) => {
    try{
        const foundUser = await User.findById(req.params.id)
        res.render('index.ejs', {
            users: foundUser,
        });
    } catch(err){
        next(err);
    }
})

router.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err){
            res.send(err);
        } else {
            res.redirect('/');
        }
    })
})




router.put('/:id', async (req, res) => {

    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

      res.redirect('/users')
    } catch(err){
      res.send(err);
    }
  })

  router.post('/', async (req, res) => {
      try {
          const createdUser = await User.create(req.body);
          res.redirect('/users');
      } catch (err){
          next(err);
      }
  })

router.post('/login', (req,res) => {
    User.findOne({username: req.body.username}, (err,user) => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.message ='';
                req.session.username = req.body.username;
                req.session.logged = true;
                res.redirect('/portfolios')
            } else {
                req.session.message = 'Username or password are incorrect';
                res.redirect('/sessions/login')
            }
        } else {
            req.session.message = 'Username or password are incorrect';
            res.redirect('/sessions/login')
        }
    })
})

router.delete('/:id', async (req,res) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.params.id);
        res.redirect('/users')
    } catch(err){
        next(err)
    }
});
    

module.exports = router;