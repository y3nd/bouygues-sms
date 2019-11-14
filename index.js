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
    var postData = {
      'username': this.userLogin,
      'password': this.userPassword,
      'rememberMe': 'true',
      '_rememberMe': 'on',
      'execution': '801771d9-da8c-4b77-be0d-512425a9b8c6_ZXlKaGJHY2lPaUpJVXpVeE1pSjkuVW05VU1sQmFlbVZ2VUVkSlJGRjZjQ3RZTVhKdGVsUmhTVU5zTVVOT1JteHBhbHBIUVVwSVJYUjJiMFpHVUdFeUt6VnlXREYxVWs1ekwwZHZSVUZyU2pSMldXeENjM2xySzFGWmQwRmlkWFpvU0dObVNtbFZlSE14UW1rNGVIWk9Na3BsVmtaVlNFaFFhMUE1WldOa1NqWk5UMkUwWmtGdmFVZHFhSEEzZGpOelowVTBUMDUyT1dkRVpqTmxVRE5MYjBGM1pVUmhia1ZNTTBseWVtdFhabFZXZUhwVFVIaHpPR2tyYWk5MFMwaGpWVTVYY0VKQ1MxWkVSa1JhWlZwbFl6aEJlUzhyYWxSTmVYVm1iRUZhTm01bFZFVk1PVmxOSzJvM1EzbHZaM2s1ZFU5MVNrY3hZMm8zTlVNd09HaGhjRTlCUzJ0d00yUnFkSEV4WkhWRmJYVlBOblpoSzBrM1FqWjBkM0p1SzNCMWMwTXhiblZYZEVGU05rVXJjWGxaTkZsdU4yOURXa1JJTVcxUlVWTTBPRXRzZUZneGNubHZiMk5oVjAxUlptSm1UQ3RuYzNFeWJtUldOM0F2Y2xobVdWcHFNMk50VWpGVmFuZG5UMWhrYzFGaVdEUnlhSGRuYUc5Q1MwczFOVWhIYlhNeGRtNTRXVWhzTURNclRqUlRWazVUVHpnMFFVVk5ZM3BRV2xsdGRXbHhWRGRxYmpGa2JIcFRRVzFzZDA5NmVFVk9PRVpWTTBvemJIbHRSR1pKT1RGNVpuRnJjMmxPTDA4MlZsTk9OVWxVTWxCb2VsbzBlbTFUWmt4Rloza3ZZMDFRVEdaUVZYWlBXbUpJV25vNVJ6bGhTM2x3U2twdmRsZ3JibmxHYWt4dWFHcHhWMmRwY0d3MFkxRm9XRzgzTTJGb2J6UTRUMUUxZFM5V1MyNW1Wa05oUTJ0dWMxRXJkbWMyYnpCbldGSTNZeXRMVG13M1JVaERUblZWUVZWNmJtZGxkV2xvWWtoeE1VdGFjVm8zTUc5dmFXdHZlR0ZIVVdwS1lsTm9URUp5ZFZCelVFMUJMMWd3UWxkc1VtMUpjMEpVWnpsVWNXaEZTMkZITjNaalNVTlRTVmRxVjFGU2MzSTVUbE55TDNOeFNqQlhZa042UlhScmVYSkNUMFpJZDJ4R2IxZFFMMU5yU0VkTGJTOUJaeTlOUmtoNloxcEtkU3RSVTBjNWRrWXliVzlUWjNFekx5OXFaaXREY21WMFNEaDBTMVJuTjBsMVVXdEllRXhQTmtsRGFFMXFUR1Z2UmxkTFJsSnNNMGRXYTBoWVNHMWFZamR6UWt0eU5XOWxlSGN2YVhWUVdGUnBWMHBTVjFsSE5FZEJWVlJaVlV4SVlqazNNa3BOVWxKMlUzVmFabE5uUXpoMmFtZFJOMVZVY2xsU2NHRTFWbEpPU205VE9YQklOV0owT1VORWFUTkVkRXRVTjFNdlNVSkxjSHA0YVd0WVRHeHZPRVJQVDJJMVdqbGliMmxwTUdKNWIwUjNVMVIyWXpsQlZuZG1RamhDTkcxVFoyaHRiRmRLT1Zwb01ESnpLMWhJUTJwdVltbHlRVFEwYVhGdU9GRnpUVVpRYkRRME9FbEhkWFJrWXpCM1pVMXZNVXA1U1daNWIxQTJNbkZvVVdadlUwdDVUek5vUkdwU09EUjVjRU40UjJrM1JrTTJSM2xVUlVSeFdrZENURlJKV0N0RVFrVnVkMkZzTm1ab2J6QlBNVWxrTUhGUVlubHdjbVpoT0hwNE9IWjBhSFpRVlhSS2IyUjJhSGRYYlRjM09IZHVXazQ0TlROemVEbHFZbGcwUTNWRU9WWjFWR2RtWm0xNVkwTXJNMEpsT1hkMmExUk5hakJqY1daeVRIaE1hV3MzUTJOb1VtUnJiRnAzWnpWeVRXVjVPRFJ4VDBaaE9IRm5XRTVZZFRKMGJFWlljU3RtZUZOVUx6RldWMlJoZDBJNU4yeHBNM0l2Wmt4MldFRkNWMmhETHpOaE1tcGhVVTFuZUZkMFRsZGlkMVExUjBoT1RscGtNVmRhWWpSNmIzTm1hMlZpUWtSTGFDOWFXRXczUjFWd1R6a3JVRzloZDFnMFRYRllibWw1T1ZabGNUSkxWalZPU1RSMWEyNURZVWROVVRGVU5WWnpZWGxyWmxGNVluWjBSSFZzZVRGR1dVZFNTRFJOVVRCWVRVUm1WVk5GVDFrMEt5OUVNMmwyVnpsVGVESnVWV3RQZEZGME5IZE9aR2d2ZDA1elYxbE9TalU0ZVRSMlNTczVjRmRTZVVnNGRFMXFVazVsVFZnNFpWTkJRMEZETVhoYVMyTmFNVmh0VEV0M1IwcHNiWGhJYW5nM1FsVkJMMnd2UTNsTFlVeFJZVzFDV25kblQyaDBSakkxVDBaMGEwbFRNUzlWTVVwQlQwaElURFZ2Y20xMFMyWnFiV04xV25oSFV6QXpibVpwVGpGaVRHbzRWMjV1VG04dlIxaHZiVzFwVm1SNVExaDNObGt2ZURsNE1FazFWRkJIZFRGeFRYQlNMelo1ZG5oTFNDOUJjM1ZXTkdGb09TdG5OMlJsTXpKaFVVRmpSVUZaYjFabFExaHZaVWhWUTBac1VtZzJkMElyYVdKME0xbENRMUJ2U1hCd1dteDJOREpRU2xGT0sxTkpSV3RtT0daUVMzRlFjSGRvT1hObVNVcHZhRzlHTWpoUlNsbHdTa0l6V2toRGFWWXlja2gyV25CUU1VZHhkMGhRVTJrdk9VZENWMFowY1ZocVlWWjRhVGxWSzJGd2VtTlNZMmxqVVd0S2VFNXJNbnBMT1RkaE5WbG9WbEIyY1ZncmFubFlPV3hJV1U4NE1HWlJRWGxFVmtWMlUzUjVlRmN5VGpjeFlXUjFiM3A2YTA1elJXY3ZWRGRzY1ZCQ2IwZDNNalUxYkhJM1JXcFJaM2h4V25OWllUbGFaMFUzZGtwV1dtdGtVbVZOZVRjdlNsUlhXRlpZV1VSSlNFMVdSVWRKU1VKS1FUSXhka0ZYV1VkWVRFSm9hRVphZVhoS1RXOUNUV2xUTjFKcVdEUjZZblJTYkhSNmJGZHZlamxhUWk5UFdtcFRhMW80U2tKcFNFUlZaU3RyYm0xaU9VbENTVEZzUm1OSFlWbGxaVFJwY0dKUlRpOTNjWEZuY0U1TmRGQkdVM2xtUzJZdkwyNUhVRUphYzFsWGVGcDZRVkYwYm5aSGMxQkNXVXd4WjFRNE5HSmtNMGRNUmtKM1pqRlBjV0ZTYVhGc2FFczRRM2hDUWxjcldITnpXVVpCVTFGaU5HeDRNVEpOWm5wYWRTczBXWGxKU1ZSaWJtMU1aMUV3V0ZaUGNFNDFlbE5FTVVSNmJ5OXdhMHgyWjFOdmFGWnhSaXNyVFdvMlZXNUJVbmxuYUZoaWNHTlZkV2czTmtKSFNYZHZPRWs1WlRkT2EweHZjVlI0UlZaSU1rODFWbElyVWtwSk1WbzFSVkZRZEZGWWJYRlZWVkJ6VTJGeVpYWklXVzF2VTBWdVdsVklLME5TWWtKTlYzZE5WbGx5ZDFGMlJITXdORE4xVVRKVlRXTlZiemhXYUdsUGVEQTJZVFZzV1ZaeFlVZDNXRU5VV1ZGTlpGbEthVmh4TTBwck9YaFVNbmxFUVRCaVRYSnlUMlppUWtSUFRVeGFjMnRQYTFwTlRHWnVkVFZyYVUxemRrdElhRU5WUVRNdk5WcEtjMjFxU0dwTGVGUkdNbWMxZVdSR1UxWkJVbTUxTkdObVZGQmFSbGx6UlhwVldITlJUelpNV0RodU5sWlVWalV6YURSUVNFUjZVVzB3VTFoak4wcHVWMjh3YmtzdlFsWktaMkZzVmtnNVJFVkNSazE2U0RCbkswbGhkemRSYTNaMVR6Wk9jRVZ2UlZJMlpqUnJhazlNWkVGNlZEQm5RbUpLUVU5VWQyTmxlbk5vT0hKRlVFdE5jekpUTlhSMWNXWnhTRlpSVTNob1dqUk1TVTV2T1U1WWQwaEZSM1F3Ym10REwycDBUSEpWYzBWRVIxbFBVV2gwWVZOTlZ6UlBiQ3RGZGxGVGFVVmFSVlpsYlVseFRYTkhNazh3UzBkVFpHOVZjM0pWUm5CMmFGYzNXVlpUTjJ4NFMyNXNaaXRpVGxBd1NqQjRXVzlwZGpOcFNrTnlkblJZWnpWWGREa3dUa2RLYUUxdVdqa3ZiakZRVmxod01rUmxRek5QUjNGUVVrUnFVVlZQYjBsblZISmxUREl2V0dsa1pXRlRSVFZrUkZCU2RYcHJMMFJ5UlRCdVpXMVdhbVZOU2t0a1l6WTNUMlFyZVdObGRsQndiVUp3YXpsSFYwVkJjMUJqUlN0RmNIVktjbGxFVHpWRlQwMHZVeloxZFZvd1NFODNXVEpQVHpOUmRXRjZSaTloY1ZWQk1rOUxlR3c1V1dsYVZ6SlhVMlpwVkU1MGJWaGlOVFpvY2tKaloyRm9MemRMZWt0eWJsSjFlV0ZQWTA1emRHWjNlV2xGU1RreFQzVllRMGw0UVVzeFVXMHJOV0ZqV21wT1NUbFNTRUpWVWpSUGVYb3JOVnBaU21WS1FubEJSazVHU3pWMldFSnBiWE5EUm1GR05UVlBXRFk0YjFFcmRuSkxWVzlFTVV0MllVRnBZMkU1YUc5bFFWQllha0pZTVZoRmVUbGpUeko1ZEU1b2FHdFFlRE5QY1VoMlFXSm1VbGxKYVVWT2RqVkpSMGRzT0dGWFNqSTJMMnRHTVRKVFFtMUxUakppT1U0dmFVTTVhR1J6YkdoYWRYWm9lWGxzVVdoTmNFMXdNVlZNVGpGQlpWZFlhREF5Wm1OQ2JWZ3ljRU4yWnpZMFpXTjFWVWN3V1ZJM1NuQkVhbTFwWmt4Mk5WTnNXbXBXVEhRd1ZFbHJjMjQzYTFsRVRWTlJZVFZPY2xoSmFqVm1WVUV6ZEV0S2JUWk1XRFJMUVhGd0szRTRhbkY2WlU1V2FFVnROWGhYVVRoSVVEQnlXbmRHUkhwaVoya3dhekZoVjFvd1FXZFRTalZ4Vmxsa1NUSTRRbmxWTTFVdmFsbFNOVFJJVWpsclNVa3JkMDluYlhGRVRYWjVaWEF5ZFZrek0yZFJjaXN3YkdvMFIycDVUMDFuZDFCVEsxRkplblJhWVdWeGJWbHhia0ZUVUUxRVJqVXZiV0l2ZDJwQlJrdERla1E1Ulhvd1ZrZEhNME5WTlhNcldVRktOMlp2TkZOd09EQlZWbVZLV2tSeGJUQndSM2RDVjNWNE0wRmFaRnBPYlROT1RUWldORWhRU0VJdlp6RlpWMkZTVkM4eFREbHBZVEpTYzJWMVNEVk1PSGxZTTJneVJXNTBia1ZMVlhOTEwwUTJaM1JHTW1kUlVXTTFlR1ZMTms1UlJEQjFha1ZWUXpsbVMwVnlLelI1YlVFd09HSnJaRGgzUkhNMFFuUndkWHBhTVdoc1NtZDVPVTAzSzNoVFVHNVVlbkZ2UjFwS2MxUTFTbEFyUWtkMWFHRmpNakZ5VEU0NFFXaHhNMWhxTDJWNmVYYzJXakZRYjJjeGNXZHRkMFpCVVRKMVNWRkZNVU12UW5kclNuUlVSVFZzTkdwd1dWZ3plbUptY0hGdlowZElZMUZtTWs1UVFrUmpXbkJRTmxaVVMzaDVSVWhXYlZCR04wczJkV0ZaVVd4d1JYTXlWVFp0WVdKd2FFVXdUVWxITkcxQ0sxcEpRMEUwVm1GcVJYSkdjazVuV1dOUlZFRmxWRTlaVUhJdmJHNUlTV2htVDJkclJ6RlVaekZJVmtkemEyaDZlbEJ5Y25sR2NsTldNbUY2ZVd4M2VGcHpaMWcwTjJaRlRuaDRNbGczT0U1RmFtVjVha2gzYXpFcmQyNHJhemRKWlRkSVYybHhXQS55aUFYdFJSQloyeWRrcTFlUmlvOU9KNnlidUxCbDRkMHBxamdIZVpPVUVBNFNEWEQzSU5SRVJJVmJ4WHNTeW9MdWZ2RXhXOWxwNmRPZGJ1NjhDeDhYZw==',
      '_eventId': 'submit'
    }
    this.req("POST", "https://www.mon-compte.bouyguestelecom.fr/cas/login;jsessionid=?service=https%3A%2F%2Fwww.secure.bbox.bouyguestelecom.fr%2Fservices%2FSMSIHD%2FsendSMS.phtml", postData, (response, body) => {
      if(body.match(/<p class=\"color-mid-grey\">Votre identifiant ou votre mot de passe est incorrect<\/p>/) !== null) cb({ code: "LOGIN_WRONG" });
      else {
        this.log("Authenticated successfully!");
        cb(false);
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
