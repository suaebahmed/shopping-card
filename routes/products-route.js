const router = require('express').Router();
const Product = require('../models/model.product');
const Cart = require('../config/shoppingCart')

router.get('/',(req,res)=>{
    Product.find((err,products)=>{
        if(err){
            res.send('error in products router')
        }else{
            var newArr = []
            for(let chunk=0; chunk<products.length; chunk+= 3){
                newArr.push(products.slice(chunk,chunk+3));
            }

            res.render('index',{allProducts: newArr})
        }
    })
})

router.get('/addcart/:id',(req,res,next)=>{
    var productId = req.params.id;
    var oldCart = req.session.cart ? req.session.cart.items : {}
    // console.log(oldCart)
    var cart = new Cart(oldCart)

    Product.findById(productId,(err,product)=>{
        if(err){
            res.send('err in add cart routes')
        }else{
            cart.addCart(product,product._id)
            req.session.cart = cart;
            // console.log(cart)
            res.redirect('/')
        }
    })
})

module.exports = router;