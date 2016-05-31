/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function (defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'whatwg-fetch/fetch.js',
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)'
    ],
    polyfills: [
      'vendor/whatwg-fetch/fetch.js',
      'vendor/es6-shim/es6-shim.js',
      'vendor/reflect-metadata/Reflect.js',
      'vendor/systemjs/dist/system.src.js',
      'vendor/zone.js/dist/zone.js'
    ]
  });
};
