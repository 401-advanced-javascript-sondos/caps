'use strict';
require('dotenv').config();
const io = require('socket.io-client');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;
const socket = io.connect(`http://${host}:${port}/caps`);
const storeName = process.env.Name;



socket.on('pickup', payload => {

  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderId}.`);

    const messageObject = {
      room: storeName,
      payload: payload,
    };
    socket.emit('in-transit', messageObject);

  }, 1500);


  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderId}.`);
    const messageObject = {
      room: storeName,
      payload: payload,
    };

    // let msg = JSON.stringify(messageObject);
    // client.write(msg);
    socket.emit('delivered', messageObject);

  }, 3000);
});

module.exports = socket;

