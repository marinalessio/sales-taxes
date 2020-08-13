const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const ProductController = require('./src/controllers/Product');
const BasketController = require('./src/controllers/Basket');

const app = express();

var allowedOrigins = ['http://localhost:3000',
                      'http://yourapp.com'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

app.get("/products", (req, res) => {

    var products = ProductController.getAllProducts();
    if (products) {
        res.status(200).send(products);
    } else {
        res.status(500).send('Invalid request');
    }
    
});

app.post("/products", (req, res) => {
    
    if(req.body) {
        if (ProductController.create(req.body)) {
            res.status(200).send('Product created');
        } else {
            res.status(500).send('Invalid request');
        }
    } else {
        res.status(500).send('Invalid request');
    }

});

app.post("/bill", (req, res) => {
    
    if(req.body) {
        var basket = BasketController.calculate(req.body);
        if (basket) {
            res.status(200).send(basket);
        } else {
            res.status(500).send('Invalid request');
        }
    } else {
        res.status(500).send('Invalid request');
    }
    
});