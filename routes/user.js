const router = require('express').Router();
const passport = require('passport')


router.get('/login',(req,res)=>{ // turn off login page
    res.render('signin')
})
router.post('/signin',(req,res,next)=>{
    const {email,password}= req.body;
    if(email == '' || password == ''){
        req.flash('error','make sure email and password not empty!')
        res.render('signin');
    }
    else{
        passport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/users/login',
            failureFlash: true,
            successFlash: 'Welcome!'
        })(req,res,next)
    }
})

router.get('/logout',(req,res,next)=>{
    req.logout();
    req.flash('success','you successfully logout')
    res.redirect('/users/login')
})

module.exports = router;