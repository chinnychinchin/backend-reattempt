//Load required libraries
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

//configure port 
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

//Initiate an instance of express
const app = express();

//Create a cart
const cart = [
    {id: uuidv4(), item: "chairs", quantity: 10},
    {id: uuidv4(), item: "tables", quantity: 20},
    {id: uuidv4(), item: "easels", quantity: 40},
]


//Configure routes

//Allow CORS
app.use(cors());

//allow the payload of the put request to be parsed into req.body
app.use(express.json())

// GET cart
app.get('/cart', (req,res) => {

    res.status(200),
    res.format({
        'application/json': () => res.send(cart)
    })
})

// GET item details
app.get('/cart/:id', (req,res) => {

    const id = req.params['id'];
    const item = cart.find(item => item.id == id);
    if (item == undefined) {
        res.status(404)
        res.send({})
    }
    res.status(200);
    res.format({
        'application/json': () => {res.send(item)}
    })
})

//UpSert cart 
app.put('/cart/:id', (req,res) => {

    const id = req.params['id'];
    const payload = req.body;
    const itemIndex = cart.findIndex(item => item.id == id);
    if (itemIndex == -1) { 
        cart.push(payload);
    }

    else {
        cart[itemIndex] = payload
    }

    res.status(200);
    res.send({})
    

} ) 

//Start express server
app.listen(PORT, () => {console.log(`Your app started on port ${PORT} at ${new Date()}`)})