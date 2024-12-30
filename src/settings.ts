/**
 * This is the name of the platform that users will use to register the plugin in the Homebridge config.json
 */
export const PLATFORM_NAME = 'Yeelight BLE';

/**
 * This must match the name of your plugin as defined the package.json
 */
export const PLUGIN_NAME = 'homebridge-yeelight-ble';

export const SERVICE_UUID = '0000FE87-0000-1000-8000-00805F9B34FB';
export const CONTROL_CHAR_UUID = 'AA7D3F34-2D4F-41E0-807F-52FBF8CF7443';
export const NOTIFY_CHAR_UUID = '8F65073D-9F57-4AAA-AFEA-397D19D5BBEB';
const CONTROL_HANDLE = 0x43;
const STATE_HANDLE = 0x45;
const MAX_RETRIES = 10;