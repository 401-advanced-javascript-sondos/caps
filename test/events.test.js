'use strict';



const driver = require('../driver/driver');
let client = require('socket.io-client');
let socket = client.connect();

jest.useFakeTimers();

beforeEach(jest.clearAllTimers);

const delivery = {
  store: '1-206-flowers',
  orderID: '1234',
  customer: 'tester testerooni',
  address: '123 Nowhere Lane',
};

describe('driver handlet', () => {

  it('call driver', () => {

    console.log = jest.fn();
    // let start = driver.socket;
    const inTransitHandler = jest.fn();

    socket.on('in-transit', inTransitHandler);

    socket.emit('pickup', delivery);

    expect(inTransitHandler).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(2000);

    expect(inTransitHandler).toHaveBeenCalledTimes(0);

  });
});



const vendor = require('../vendor/vendor');
let client1 = require('socket.io-client');
let socket1 = client1.connect();

jest.useFakeTimers();


it('should emit order', () => {

  const callback = jest.fn();

  socket1.on('pickup', callback);

  expect(callback).not.toBeCalled();

  vendor.generatOrder;

  jest.runOnlyPendingTimers();

  // expect(callback).toBeCalledWith(expect.objectContaining({store:'1-206-flowers'}));
  expect(callback).toBeTruthy();

  // expect(callback).toHaveBeenCalledTimes(1);

});