// File Name pizza-shop
const EventEmitter = require("events");

class PizzaShop extends EventEmitter {
    constructor() {
        super()
        this.orderNumber = 0;
    }

    order(size,topping) {
        this.orderNumber++;
        this.emit("order",size,topping)
    }

    displayOrderNumber() {
        // console.log(`current order number : ${this.orderNumber}`)
        this.emit('displayOrderNumber',this.orderNumber)
    }
}

module.exports = PizzaShop;