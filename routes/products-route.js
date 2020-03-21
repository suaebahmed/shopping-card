const router = require('express').Router();
const Product = require('../models/model.product');

router.get('/',(req,res)=>{
    Product.find((err,products)=>{
        if(err){
            res.send('error in products router')
        }else{
            var newArr = []
            for(let chunk=0; chunk<products.length; chunk+= 3){
                newArr.push(products.slice(chunk,chunk+3));
            }
            // console.log(newArr)

            res.render('index',{allProducts: newArr})
        }
    })
  })


module.exports = router;