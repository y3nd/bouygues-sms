# bouygues-sms
[![npm version](https://badge.fury.io/js/bouygues-sms.svg)](https://badge.fury.io/js/bouygues-sms)
[![npm](https://img.shields.io/npm/dt/bouygues-sms.svg?maxAge=2592000)]()

Package to use the Bouygues Telecom SMS unofficial API (5 SMS /day limitation)

Based on [this php script](https://rpi-florentv.zapto.org/gitlist/index.php/send-sms.git/blob/master/bouygues/bouygues.php)

* ES6 (needs Node.JS >= 6.0.0)
* 5 SMS /day
* Quota reset at midnight
* 160 chars count limit

## Usage
### Installation
```shell
npm install bouygues-sms
```
### Auth + send "Hello World!" to 0600000000
```javascript
const Bouygues = require("bouygues-sms");
var sms = new Bouygues("bouygueslogin", "bouyguespassword", 1);

sms.send("Hello World!", "0600000000", () => {
  console.log("success");
});
```
### Get quota left
```javascript
sms.getQuota((quota) => {
  console.log(quota + " sms left today");
})
```
### Send to multiple numbers (up to 5)
```javascript
sms.send("Hello World!", ["0600000001", "0600000002", "0600000003", "0600000004", "0600000005"], () => {
  console.log("success");
});
```
