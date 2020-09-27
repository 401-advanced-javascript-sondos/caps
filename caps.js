'use strict';

const events=require('./events');
require('./vendor');
require('./driver');

//Manages the state of every package (ready for pickup, in transit, delivered).
events.emit('order');

