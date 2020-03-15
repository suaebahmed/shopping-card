const router = require('express').Router();
const User = require('../models/model.user');
const bcrypt = require('bcryptjs')

router.get('/register',(req,res,next)=>{ // turn off register page
    res.render('signup')
})

router.post('/signup',(req,res)=>{

    const {email,password} = req.body;
    console.log(req.body)
    var errArr=[]
    if(!password  || !email){
        errArr.push({msg: 'fill all the feild'})
    }
    if(password.length < 5){
        errArr.push({msg: 'password should be at least 6 character'})
    }
    if(errArr.length > 0){
        console.log(errArr)
        res.render('signup',{error: errArr})
    }else{
        User.findOne({email: email},(err,user)=>{
            if(err){
                res.status(500).json({
                    msg: "mongoose err",
                    err: err
                })
            }
            else if(user){
                errArr.push({msg: 'user already exists'})
                res.render('signup',{error: errArr})
            }else{
            bcrypt.genSalt(10,(err,selt)=>{
                bcrypt.hash(password,selt,(err,hash)=>{
                    var newUser = new User({
                        email,
                        password
                    });
                    newUser.password = hash
                        newUser.save()
                        .then(()=>{
                            req.flash('success','You successfully signup now you can signin')
                            res.redirect('/users/login')
                        })
                        .catch(err=>{
                            res.status(500).json({
                                Error: err
                            })
                        })
                    })
                })
            }
        })
    }
})

module.exports = router;