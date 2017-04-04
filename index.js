'use strict';

const http = require('http');

/**
 * Check if the responsed Status code is within a Good Code Range
 * @param {Number} HTTP Status Code
 */
const check_status_code = (code) => {
  return (code < 200 || code > 299);
};

const http_health = (hostname, port, path) => {
  http.get({
    hostname: hostname,
    port: port,
    path: path
  }, (response) => {
    if (check_status_code(response.statusCode)) {
      console.error(response.statusCode + ' : ' + response.statusMessage);
    } else {
      console.info(new Date().getTime());
    }
  }).on('error', (exception) => {
    console.error(exception.code);
  });
};

const timer = setInterval(() => {
  http_health('xen-rest', 4567, '/block/vbd/');
}, 1 * 60 * 60 * 1000);
