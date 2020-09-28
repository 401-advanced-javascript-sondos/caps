'use strict';

require('dotenv').config();
const net = require('net');

const client = new net.Socket();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

client.connect(port, host, () => {
  console.log(`driver app online. Successfully connected to ${host} at ${port}`);

});


client.on('data', buffer => {
  let events = JSON.parse(buffer);
  if (events.event == 'pickup') {
    setTimeout(() => {
      console.log(`DRIVER: picked up ${events.payload.orderId}.`);
      const messageObject = {
        event: 'in-transit',
        payload: events.payload,
      };

      let msg = JSON.stringify(messageObject);
      client.write(msg);
    }, 1000);


    setTimeout(() => {
      console.log(`DRIVER: delivered ${events.orderId}.`);
      const messageObject = {
        event: 'delivered',
        payload: events.payload,
      };

      let msg = JSON.stringify(messageObject);
      client.write(msg);
    }, 3000);
  }


});

