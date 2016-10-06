const Bouygues = require("./index.js");
var sms = new Bouygues("bouygueslogin", "bouyguespassword", 1); // login / password / log

sms.send("Hello World!", "0600000000", () => { // message content (limited to 160 chars) / phone number(s) / callback
  console.log("success");
});

sms.getQuota((quota) => {
  console.log(quota + " sms left today");
})
