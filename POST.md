In a [recent post](http://tattoocoder.com/angular-cli-using-the-environment-option/), the CLI and environment.ts were used to determing the current running environment and what settings to use. However, there were some shortcomings to this approach
not only in the fact that only `development` and `production` were supported but others mentioned as well.

In Angular 1.x using [*manual bootstrap*](https://docs.angularjs.org/guide/bootstrap), where the application would need to do some work prior to *starting up*, was such a need that it has a home in the [docs](https://docs.angularjs.org/guide/bootstrap). However, in Angular 2 this pattern is not established.

I started looking and asking, "What is the manual bootstrap for A2?" Of course, thanks to naming "bootstrap" is awful when paired with almost anything web. Nevertheless, there is a question and answer here to be take into account...

###Question?
I need to get some *data, settings, api url, etc* before my app starts, what are my options?

###Answer(s)?
If you are building in each environment, you could use `environment.{env}.ts` as shown in this [post](http://tattoocoder.com/angular-cli-using-the-environment-option/) **OR**
get them from the originating server using the `fetch` api and let the server determine the ENVIRONMENT and return that information as well as any other relevant settings prior to the
application starting.

Related Posts:

* [Giving your CLI a Server](http://tattoocoder.com/angular2-giving-your-cli-server/)
* [Application Settings using the CLI Environment Option](http://tattoocoder.com/angular-cli-using-the-environment-option/)
* [A Re-Quickstart using the CLI](http://tattoocoder.com/angular2-requickstart-using-cli/)
* [Continuous Integration to Azure using Codeship and the Angular CLI](http://tattoocoder.com/angular2-azure-codeship-angularcli/)


##The Server
*This portion builds on the [Giving your CLI a Server](http://tattoocoder.com/angular2-giving-your-cli-server/) post*

First, the environment based config or settings files and code need to added. So a `/config` folder is added with the following files.

```bash
config
├── development.js
├── index.js
└── production.js
```

The `index.js` file contains simple code to load the environment specific file based on **NODE_ENV**.  A change could be made to trigger off of any other variable depending on your build process or need to support
other environments (APP_ENV for example).
```javascript
var config
  , config_file = './' + (process.env.NODE_ENV ? process.env.NODE_ENV : 'development') + '.js';

try {
  config = require(config_file);
} catch (err) {
  if (err.code && err.code === 'MODULE_NOT_FOUND') {
    console.error('No config file matching NODE_ENV=' + process.env.NODE_ENV
      + '. Requires "' + __dirname + '/' + process.env.NODE_ENV + '.js"');
    process.exit(1);
  } else {
    throw err;
  }
}
module.exports = config;

```
Next, the `production.js` and `development.js` file contain the settings specific to the environments and our needs.
```javascript
exports.app = app = {
  title: 'a2-serversettings',
  port: 80,
  environment: 'production',
  start: 'index.html'
}

exports.api = {
  base_url: 'http://api.webserver.com/'
}
```

A variation to the `development.js` file such as `base_url: 'http://localhost:5001/` would be an example.

Next, implementing the `/settings` endpoint in the `server.js` file which will be used as the GET method by the angular app for retrieving this info.

```javascript
//import the config
config = require('./config');

// GET settings route
app.get('/settings', function (req, res) {
    // create the return object
    var settings = {};


    // set the properties
    settings.title = config.app.title;
    settings.environment = config.app.environment;
    settings.webApiUrl = config.api.base_url;

    // return the settings
    res.send(settings);
});
```


```
#install the window.fetch polyfill
$ npm install whatwg-fetch --save

#install the typescript typings from defintelytyped
$ tsd install whatwg-fetch --save
```

add reference to `browser.d.ts`
```
/// <reference path="whatwg-fetch/whatwg-fetch.d.ts" />
```

modify angular-cli-build.js to add the `fetch.js` polyfill
```javascript
module.exports = function(defaults) {
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
```

Need to add the change to the `vendorNpmFiles` section to get the files copied in the `ng build` process and then add **all** of the polyfills section because the cli uses a *default* list OR **this* list.