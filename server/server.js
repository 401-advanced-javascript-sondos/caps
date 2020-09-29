'use strict';

require('dotenv').config();
const net = require('net');
const server = net.createServer();
const uuid = require('uuid').v4;

const port = process.env.PORT || 4000;

//Accept inbound TCP connections on a declared port
server.listen(port, () => console.log(`server is running on ${port}`));


//Creates a pool of connected clients
let clientPool = {};

//On new connections, add the client to the connection pool
server.on('connection', (socket) => {
    console.log('user seccessfuly connect ');
    const id = `Socket-${uuid()}`;
    clientPool[id] = socket;


    //Read and parse the incoming data/payload
    //Verify that the data is legitimate
    socket.on('data', buffer => {
        // console.log('data/payload--------->', buffer);
        logger(buffer);


    });

    socket.on('error', e => {
        console.log('error--------->', e);
    });

    socket.on('close', () => {
        delete socket[id];
    });

});

function logger(buffer) {
    let massage = JSON.parse(buffer.toString());
    const time = new Date();
    console.log('msg=======>', massage, time);
    broadcast(massage);
}



function broadcast(massage) {
    let payload = JSON.stringify(massage);
    for (let id in clientPool) {
        clientPool[id].write(payload);
    };
};
