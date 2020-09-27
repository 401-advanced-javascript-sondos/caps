'use strict';

require('dotenv').config();
const events = require('./events');
const faker = require('faker');


const storeName = process.env.Name;

events.on('order',generatOrder);

function generatOrder() {
    setInterval(() => {

//create obj

        let randomId= faker.random.uuid();
        let randomName= faker.name.findName();
        let randomAddress= faker.address.city();

        let order = {
            storeName: storeName,
            orderId: randomId,
            customerName: randomName,
            address: randomAddress,
        }
//Emit a ‘pickup’ event and attach the fake order 
        events.emit('pickup',order);
    }, 5000);
};


events.on('delivered',thank)
function thank(payload){
    console.log(`VENDOR: Thank you for delivering ${payload.orderId}`)
};