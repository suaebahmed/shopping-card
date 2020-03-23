
module.exports = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error','you must have to sign in to see about page')
        res.redirect('/users/login')
    }
}