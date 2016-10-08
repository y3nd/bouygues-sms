# bouygues-sms
[![npm version](https://badge.fury.io/js/bouygues-sms.svg)](https://badge.fury.io/js/bouygues-sms)
[![npm](https://img.shields.io/npm/dt/bouygues-sms.svg)]()

Package to use the Bouygues Telecom SMS unofficial API (5 SMS /day limitation)

Uses calls from [this page](https://www.secure.bbox.bouyguestelecom.fr/services/SMSIHD/sendSMS.phtml), and based on [this php script](https://rpi-florentv.zapto.org/gitlist/index.php/send-sms.git/blob/master/bouygues/bouygues.php)

* ES6 (needs Node.JS >= 6.0.0)
* 5 SMS /day
* Quota reset at midnight
* 160 chars limit (message is truncated after the limit)
* Error(s) management
* Only ≈125 lines

## Usage
### Installation
```shell
npm install bouygues-sms
```
### Auth + send "Hello World!" to 0600000000
```javascript
const Bouygues = require("bouygues-sms");
var sms = new Bouygues("bouygueslogin", "bouyguespassword", 1); // 3rd argument is for debug log (1 for enabled, 0 for disabled)

sms.send("Hello World!", "0600000000", (error) => {
  if(error) {
    console.log("An error occured: " + error.code)
  } else {
    console.log("success");
  }
});
```
### Get quota left
**Left quota is checked at sms sending, no need to double check it (_don't put a sms.send in the getQuota callback_)**
```javascript
sms.getQuota((quota, error) => {
  if(error) {
    console.log("An error occured: " + error.code)
  } else {
    console.log(quota + " sms left today");
  }
})
```
### Send to multiple numbers (up to 5)
```javascript
sms.send("Hello World!", ["0600000001", "0600000002", "0600000003", "0600000004", "0600000005"], (error) => {
  if(error) {
    console.log("An error occured: " + error.code)
  } else {
    console.log("success");
  }
});
```
### Error codes
| Code             | Meaning                                                                    |
|:----------------:|:--------------------------------------------------------------------------:|
| LOGIN_UNKNOWN    | Login page has changed or Bouygues services are down                       |
| LOGIN_WRONG      | Credentials are wrong                                                      |
| QUOTA_EXCEEDED   | Quota is exceeded and SMS can't be sent                                    |
| ERROR_GETQUOTA   | Error getting quota, page has changed or Bouygues services are down        |
| SMS_CONFIRMATION | Error at SMS confirmation, page has changed or Bouygues services are down  |
| SMS_RESULT       | Error at SMS result, page has changed or Bouygues services are down        |

### Notes
* **I'm NOT affiliated with Bouygues Telecom or one of its branches**
* This module may not work if Bouygues change the service, then **please report it by creating an issue**
* Emojis chars are replaced by a "?" by the Bouygues server ...
