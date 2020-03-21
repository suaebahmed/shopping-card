const mongoose = require('mongoose')
const Product = require('../models/model.product');

const url = 'mongodb://127.0.0.1:27017/shopping-card';
mongoose.connect(url, {  useUnifiedTopology: true , useNewUrlParser: true });

var products  = [
    new Product({
        title: 'Web UI Best Practices',
        description: 'The 162-page guide answers questions such as: What design processes are suitable for startups and enterprises?',
        price: 50,
        imgPath: 'https://miro.medium.com/max/750/0*yn1g4d18TaXeihkE.jpg'
    }),
    new Product({
        title: 'Programming JavaScript Applications',
        description: 'The 102-page guide answers questions such as: JavaScript features and best practices for application developers, Designing and programming RESTful APIs with Node.js',
        price: 60,
        imgPath: 'https://miro.medium.com/max/500/1*towUrm7BtrC9WQwNhFjv5g.jpeg'
    }),
    new Product({
        title: 'The Guide to UX Design Process & Documentation',
        description: 'The 102-page guide answers questions such as:',
        price: '',
        imgPath: 'https://miro.medium.com/max/750/0*y1mMyRg93oj0f3O2.jpg'
    }),
    new Product({
        title: 'Locking Down WordPress',
        description: 'In Locking Down WordPress, WordPress pros Rachel Baker, Brad Williams, and John Ford take you through everything you need to know to make sure you have WordPress security is under control.',
        price: 40,
        imgPath: 'https://miro.medium.com/max/685/1*GHdG43CLDEUjO3nSPHg0wg.jpeg'
    }),
    new Product({
        title: 'WordPress Meet Responsive Design',
        description: 'In WordPress Meet Responsive Design, Chris Coyier, Ian Stewart and Sara Cannon give you the lowdown on their real world uses and strategies for designing WordPress responsively.',
        price: '',
        imgPath: 'https://miro.medium.com/max/572/1*oswMAjoA_m7n-s1s4Y32jg.jpeg'
    }),
    new Product({
        title: 'The Guide to Mockups',
        description: 'The 132-page guide answers questions such as: What design processes are suitable for startups and enterprises?',
        price: '',
        imgPath: 'src="https://miro.medium.com/max/750/0*eSyyEYFgp8RiWZZB.jpg"'
    })
]
let done = 0;
for(let i=0; i<products.length; i++){
    done ++;
    products[i].save()
                .then(()=>{
                    
                    if(done === products.length){
                        console.log('successfull',i)
                        mongoose.disconnect();
                    }
                    return;
                })
                .catch(err=>{
                    console.log(err)
                    return;
                })
}
