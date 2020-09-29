'use strict';

require('dotenv').config();
const io = require('socket.io')(process.env.PORT || 4000);


// Create and accept connections on a namespace called caps
// Within the namespace:
// Monitor the ‘join’ event.
// Each vendor will have their own “room” so that they only get their own delivery notifications

const caps = io.of('/caps');

caps.on('connection', socket => {
    console.log('user seccessfuly connect ', socket.id);

    socket.on('join', room => {
        console.log('join room :', room);
        socket.join(room);
    });

    socket.on('pickup', payload => {
        caps.emit('pickup',payload);
        const event='pickup';
        const time=new Date().toLocaleTimeString();
        console.log(event,time ,payload);


    });

    socket.on('in-transit', payload => {
        caps.to(payload.room).emit('in-transit',payload);
        const event='in-transit';
        const time=new Date().toLocaleTimeString();
        // console.log(event,time ,payload);
        console.log(time , event, `in room:${payload.room}`, payload);

    });

    socket.on('delivered', payload => {
        caps.to(payload.room).emit('delivered',payload);
        const event='delivered';
        const time=new Date().toLocaleTimeString();
        console.log(time , event,`in room:${payload.room}`, payload);
    });


});


