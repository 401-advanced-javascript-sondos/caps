'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const faker = require('faker');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;
const storeName = process.env.Name;
const socket = io.connect(`http://${host}:${port}/caps`);



socket.emit('join', storeName);

function generatOrder() {
  setInterval(() => {

    //create obj
    // console.log('name',storeName);
    let randomId = faker.random.uuid();
    let randomName = faker.name.findName();
    let randomAddress = faker.address.city();

    let order = {
      storeName: storeName,
      orderId: randomId,
      customerName: randomName,
      address: randomAddress,
    };

    socket.emit('pickup', order);

  }, 5000);
}

socket.on('delivered', payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.payload.orderId}`);

});




generatOrder();

module.exports = { generatOrder: () => generatOrder() };