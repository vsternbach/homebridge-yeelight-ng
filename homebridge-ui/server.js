const { HomebridgePluginUiServer } = require('@homebridge/plugin-ui-utils');
const { BleManager } = require('ble-host');
const HciSocket = require('hci-socket');

class UiServer extends HomebridgePluginUiServer {
  constructor() {
    super();
    this.onRequest('/scan', this.scan.bind(this));
    // this.ready() must be called to let the UI know you are ready to accept api calls
    this.ready();
  }

  async initBleManager() {
    return new Promise((resolve, reject) => BleManager.create(new HciSocket(), {}, (err, manager) => err ? reject(err) : resolve(manager)));
  }

  async scan({ name, timeout = 5 }) {
    const devices = new Set();
    const bleManager = await this.initBleManager();
    const scanner = bleManager.startScan();
    scanner.on('report', (eventData) => {
      const { address, connectable, parsedDataItems } = eventData;
      if (connectable) {
        devices.set({ name:parsedDataItems.localName, mac: address });
      }
    });
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      setTimeout(() => {
        scanner.stopScan();
        resolve(name ? [...devices].filter(d => d.name.includes(name)) : [...devices]);
      }, timeout * 1000);
    });
  }
}

// start the instance of the class
(() => {
  return new UiServer;
})();
