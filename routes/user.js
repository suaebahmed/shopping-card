const router = require('express').Router();
const User = require('../models/model.user');
const bcrypt = require('bcryptjs')
const passport = require('passport')


router.get('/login',(req,res)=>{ // turn off login page
    res.render('signin')
})
router.post('/signin',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true,
        successFlash: 'Welcome!'
    })(req,res,next)
})

router.get('/logout',(req,res,next)=>{
    req.logout();
    req.flash('success','you successfully logout')
    res.redirect('/users/login')
})

module.exports = router;