'use strict';

require('dotenv').config();
const events = require('./events');


events.on('pickup', payload => log('pickup', payload));
events.on('transit', payload => log('transit', payload));
events.on('delivered', payload => log('delivered', payload));

//Logs every event to the console with a timestamp and the event payload

function log(event, payload) {
    let time = new Date();
    console.log({ event, time, payload });
};



events.on('pickup', transit);
events.on('transit', deliver);


function transit(payload) {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.orderId}.`)
        events.emit('transit', payload)
    }, 1000);
};



function deliver(payload) {
    setTimeout(() => {
        console.log(`DRIVER: delivered ${payload.orderId}.`)
        events.emit('delivered', payload)
    }, 2000)
};