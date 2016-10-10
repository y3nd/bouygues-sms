# hp-webscan
[![npm version](https://badge.fury.io/js/hp-webscan.svg)](https://badge.fury.io/js/hp-webscan)
[![npm](https://img.shields.io/npm/dt/hp-webscan.svg)]()

Package to scan documents with the HP webscan unofficial API

Uses calls from printer's web interface (port 80)

* ES6 (needs Node.JS >= 6.0.0)
* Choose format and size
* Fast
* Error(s) management
* Only ≈65 lines

## Usage
**Please see [notes](#notes) before using this module**
### Installation
```shell
npm install hp-webscan
```
### Scan a document
```javascript
const Webscan = require("hp-webscan");
const fs = require("fs");

var ws = new Webscan("printer's hostname/ip", 1);

// See type, fmt, size definitions below
ws.scan({ type: 4, fmt: 1, size: 2 }, (data, error) => {
  if(error) {
    console.log("an error occured: " + error.code)
  }
  else {
    // Do whatever you want with the binary data
    // Here we write the document on disk using fs
    fs.writeFile(__dirname + "/scan.jpg", data, "binary", (err) => {
      if(err) {
        return console.log(err);
      }
      else console.log("Document successfully scanned and saved!")
    });
  }
})
```
### Get a preview (much faster than a scan)
```javascript
ws.preview({ type: 2 }, (data, error) => {
  if(error) {
    console.log("an error occured: " + error.code)
  }
  else {
    // Do whatever you want with data
    // Here we write the document on disk
    fs.writeFile(__dirname + "/preview.jpg", data, "binary", (err) => {
      if(err) {
        return console.log(err);
      }
    });
  }
})
```
### Types
| ID | Value                     |
|:--:|:-------------------------:|
| 1  | Text (black and white)    |
| 2  | Picture (black and white) |
| 3  | Drawing (colored)         |
| 4  | Picture (colored)         |
### Sizes
| ID | Value                  |
|:--:|:----------------------:|
| 0  | Letter                 |
| 1  | Executive              |
| 2  | A4(8.27x11.69")‎        |
| 3  | 10.16x15.24 cm. (4x6")‎ |
| 4  | 12.7X17.78 cm. (5x7")  |
| 5  | 7.6x12.7 cm. (3x5")‎    |
| 6  | 7.6x7.6 cm. (3x3")‎     |
### Formats
| ID | Value                                    |
|:--:|:----------------------------------------:|
| 1  | image/jpeg                               |
| 2  | application/pdf (**crashes my printer**) |
### Error codes
| Code             | Meaning                                               |
|:----------------:|:-----------------------------------------------------:|
| WS_STATUS        | Webinterface can't be reached or version incompatible |
| GET_SCAN         | Cannot download the scanned document                  |
| GET_PREVIEW      | Cannot download the previewed document                |

### Notes
* **I'm NOT affiliated with Hewlett Packard/HP or one of its branches**
* You could combine this module with node-tesseract to make a powerful ocr-scanner
* This module may not work on another version than mine, I have this one:
![mine](https://cloud.githubusercontent.com/assets/18102153/19221433/f3151f14-8e43-11e6-8d68-ce87e7e7e0b7.PNG)

| Name             | Value                                    |
|:----------------:|:----------------------------------------:|
| Product Name	   | HP Deskjet F4500 series                  |
| Product Model    | Number	CB755B                            |
| Product Serial   | Number	CN9CIB218Z05H5                    |
| Service ID       | 20090                                    |
| Printer ID       | 4                                        |
| Firmware Version | MPxxFN0937AR                             |
