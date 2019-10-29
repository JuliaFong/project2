const mongoose = require('mongoose')

const portfolioSchema =  mongoose.Schema({
    portfolio: [String],
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

})

const Portfolio = mongoose.model('Portfolio', portfolioSchema)

module.exports = Portfolio;