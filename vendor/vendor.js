'use strict';

require('dotenv').config();
const net = require('net');

const faker = require('faker');
const client = new net.Socket();


const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;
const storeName = process.env.Name;


client.connect(port, host, () => {
  console.log(`VENDOR app online. Successfully connected to ${host} at ${port}`);
});




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

    const messageObject = {
      event: 'pickup',
      payload: order,
    };
    console.log('obj',messageObject);

    let msg = JSON.stringify(messageObject);
    console.log('msg',msg);
    client.write(msg);

  }, 5000);
}

client.on('data', buffer => {
  // console.log('buffer vendor',buffer);

  let events = JSON.parse(buffer);
  // console.log('after buffer vendor',buffer);

  if (events.event == 'delivered')
    console.log(`VENDOR: Thank you for delivering ${events.payload.orderId}`);

});

client.on('close', function () {
  console.log('connection is closed!!');
});


generatOrder();
