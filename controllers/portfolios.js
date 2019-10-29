const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const Portfolio = require('../models/Portfolios')

router.get('/', async (req, res) => {
    try {
        const foundPortfolios = await Portfolio.find();
        res.render('index.ejs', {
            portfolios: foundPortfolios
        });
     } catch(err){
            next(err);
        }
});

router.get('/:id/edit', async (req, res) => {
    try{
        const foundPortfolio = await Portfolio.findById(req.params.id)
        res.render('index.ejs', {
            portfolios: foundPortfolio,
        });
    } catch(err){
        next(err);
    }
})

router.put('/:id', async (req, res) => {
    try{
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, {new: true}).populate('Users');
        res.redirect('/users')
    } catch(err){
        res.send(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const createdPortfolio = await Portfolio.create(req.body);
        res.redirect('/portfolios');
        } catch(err){
            next(err);
        }
})
router.delete('/:id', async (req,res) => {
    try {
        const deletedPortfolio = await Portfolio.findByIdAndRemove(req.params.id);
        res.redirect('/portfolios')
    } catch(err) {
        next(err)
    }
});

module.exports = router;