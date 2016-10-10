const request = require("request");


module.exports = class {
  constructor(address, log) {
    this.address = address;
    this.debugLog = log;
    this.validFormats = ["image/jpeg", "application/pdf"];
    this.webStatusForm = {
      "ws_operation": 1,
      "ws_scanid": 0,
      "ws_type": 0,
      "ws_format": 0,
      "ws_size": 0,
      "ws_scan_method": 0
    }
  }

  scan(opt, cb) {
    this.req("POST", "/wsStatus.htm", { form: this.webStatusForm }, (response, body) => {
      if(response.statusCode !== 200 || response.headers["content-type"] !== "text/html;charset=utf-8" || body.match(/<FORM name=wsstatus method=post ACTION=\"\/wsStatus\.htm\">/) == null) {
        cb(null, { code: "WS_STATUS" })
      }
      else {
        this.req("GET", "/scan/image1.jpg?id=0&time=" + Date.now() + "&type=" + opt.type + "&fmt=" + opt.fmt + "&size=" + opt.size, { encoding: "binary" }, (response, body) => {
          if(!this.validFormats.includes(response.headers["content-type"])) cb(null, { code: "GET_SCAN" })
          else cb(body, false);
        });
      }
    });
  }

  preview(opt, cb) {
    this.req("POST", "/wsStatus.htm", { form: this.webStatusForm }, (response, body) => {
      if(response.statusCode !== 200 || response.headers["content-type"] !== "text/html;charset=utf-8" || body.match(/<FORM name=wsstatus method=post ACTION=\"\/wsStatus\.htm\">/) == null) {
        cb(null, { code: "WS_STATUS" })
      }
      else {
        this.req("GET", "/scan/image.pdf?id=0&prev=1&time=" + Date.now() + "&type=" + opt.type, { encoding: "binary" }, (response, body) => {
          if(response.headers["content-type"] !== "image/jpeg") cb(null, { code: "GET_PREVIEW" })
          else cb(body, false);
        });
      }
    });
  }

  req(method, url, data, cb) {
    this.log(method + " - " + "http://" + this.address + url + " - " + JSON.stringify(data));

    var options = { method: method, url: "http://" + this.address + url };
    for (var attrname in data) { options[attrname] = data[attrname]; };

    request(options, (error, response, body) => {
      if (!error) cb(response, body);
      else {
        this.log(error)
      }
    })
  }

  log(msg) {
    if(this.debugLog == 1) console.log("[HP-Webscan] > " + msg);
  }
}
