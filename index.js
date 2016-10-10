var requestb = require("request");
const request = requestb.defaults({jar: true});

module.exports = class {
  constructor(login, password, log) {
    this.userLogin = login;
    this.userPassword = password;
    this.debugLog = log;
  }

  login(cb) {
    this.log("Authenticating..")
    this.req("GET", "https://www.mon-compte.bouyguestelecom.fr/cas/login", {}, (response, body) => {

      var jsessionid = response.headers["set-cookie"][0].match(/JSESSIONID=(.*); Path=\/cas\/; HttpOnly/)
      var lt = body.match(/<input type=\"hidden\" name=\"lt\" value=\"([a-zA-Z0-9_-]*)\"/);

      if(jsessionid == null && lt == null) cb({ code: "LOGIN_UNKNOWN" });
      else {
        var jsessionid = jsessionid[1];
        this.log("Got jsessionid " + jsessionid);
        var lt = lt[1];
        this.log("Got lt value " + lt);

        var postData = {
          'username': this.userLogin,
          'password': this.userPassword,
          'rememberMe': 'true',
          '_rememberMe': 'on',
          'lt': lt,
          'execution': 'e1s1',
          '_eventId': 'submit'
        }
        this.req("POST", "https://www.mon-compte.bouyguestelecom.fr/cas/login;jsessionid=" + jsessionid + "?service=https%3A%2F%2Fwww.secure.bbox.bouyguestelecom.fr%2Fservices%2FSMSIHD%2FsendSMS.phtml", postData, (response, body) => {
          if(body.match(/<p class=\"color-mid-grey\">Votre identifiant ou votre mot de passe est incorrect<\/p>/) !== null) cb({ code: "LOGIN_WRONG" });
          else {
            this.log("Authenticated successfully!");
            cb(false);
          }
        });
      }
    });
  }

  send(msg, numbers, cb) {
    this.getQuota((quota, error) => {
      if(error) cb(error);
      else {
        var numberscount = 0;
        if(Array.isArray(numbers)) numberscount = numbers.length;
        if((quota-numberscount) >= 0) {
          this.sendSMS(msg, numbers, () => {
            this.log("SMS successfully sent!");
            cb()
          });
        }
        else {
          this.log("Quota exceeded, message not sent");
          cb({ code: "QUOTA_EXCEEDED" })
        }
      }
    })
  }

  getQuota(cb) {
    this.login((error) => {
      if(error) {
        cb(false, error);
      }
      else {
        this.req("GET", "https://www.secure.bbox.bouyguestelecom.fr/services/SMSIHD/sendSMS.phtml", {}, (response, body) => {
          var quota = body.match(/Il vous reste <strong>(\d*) SMS gratuit\(s\)<\/strong>/);
          if(quota == null) cb({ code: "ERROR_GETQUOTA" })
          else {
            var quota = quota[1];
            this.log(quota + "/5 message(s) left");
            cb(quota);
          }
        })
      }
    });
  }

  sendSMS(msg, numbers, cb) {
    if(Array.isArray(numbers)) {
      var numbersf = "";
      numbers.forEach((number, i) => {
        numbersf += number;
        if((numbers.length-i) !== 1) numbersf += ";";
      })
      numbers = numbersf;
    }

    var postdata = {
      'fieldMsisdn': numbers,
      'fieldMessage': msg.slice(0, 160),
      'Verif.x': '51',
      'Verif.y': '16'
    }

    // Send confirmation
    this.req("POST", "https://www.secure.bbox.bouyguestelecom.fr/services/SMSIHD/confirmSendSMS.phtml", postdata, (response, body) => {
      if(body.match(/<span class=\"titre\" style=\"float:left;\">Validation<\/span>/) == null) cb({ code: "SMS_CONFIRMATION" });
      else {
        // Valid sending
        this.req("GET", "https://www.secure.bbox.bouyguestelecom.fr/services/SMSIHD/resultSendSMS.phtml", {}, (response, body) => {
          if(body.match(/<td valign=\"top\">Votre message a bien été envoyé au numéro : <\/td>/) == null) cb({ code: "SMS_RESULT" });
          else cb(false);
        });
      }
    })
  }

  req(method, url, data, cb) {
    this.log(method + " - " + url + " - " + JSON.stringify(data));
    request({ method: method, url: url, form: data }, (error, response, body) => {
      if (!error) cb(response, body);
    })
  }

  log(msg) {
    if(this.debugLog == 1) console.log("[Bouygues-SMS] > " + msg);
  }
}
