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





```
#install window.fetch the polyfill
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