// Simple Example
const EventEmitter = require('node:events')

const emitter = new EventEmitter();

emitter.on('order-pizza',(size,topping) => {
    console.log(`Order Received! Baking a ${size} pizza with ${topping}`)
})

console.log('Do Work Before Event Occurs In The System');
emitter.emit('order-pizza','large','Mushroom');

// Custom Events
const PizzaShop = require('./pizza-shop')
const DrinkMachine = require('./drink-machine')

const pizza = new PizzaShop();
const drinkMachine = new DrinkMachine();

pizza.on('order',(size,topping) => {
    console.log(`Order is Received! Baking a ${size} pizza with ${topping}`)
    drinkMachine.serverDrink(size)
})
pizza.on('displayOrderNumber',(orderNumber) => {
    console.log(`Your Order Number is : ${orderNumber}`)
})
pizza.order("large","mushroom")
pizza.displayOrderNumber('displayOrderNumber')
