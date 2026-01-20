const EventEmitter = require('events');
const { logSpecial } = require('../utils/log');

const requestListener = new EventEmitter();
let requestCounter = 0;

requestListener.on("request", (url) => {
  logSpecial(`\n сделали запрос с данного url --> ${url}`, 1)
});
requestListener.on("request", () => {

});

requestListener.once("request-first", (url) => {
  logSpecial(`\n 1 запрос с данного url --> ${url}`, 1)
});


const helpRequestListener = {
  maxEvents: requestListener.getMaxListeners(),
  eventsNames: requestListener.eventNames(),
}

Object.defineProperty(helpRequestListener, "getListenerAll", {
  value: function() {
    return this.eventsNames.map((curr) => `${curr}: ${requestListener.listenerCount(curr)}`)
  },
  writable: true,
  configurable: true,
  enumerable: false
})

module.exports = {
  requestListener,
  helpRequestListener,
  getRequestCount: () => ++requestCounter
};