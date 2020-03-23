const router = require('express').Router();
const isAuth = require('../config/isAuth')

router.get('/about',isAuth,(req,res,next)=>{
    res.render('abouts');
})


module.exports = router