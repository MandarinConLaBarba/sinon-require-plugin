# RequireJS Sinon Plugin

## Intro

SinonJS is an awesome spy/stub/mock framework for JavaScript. I use this a lot in conjunction w/ RequireJS, so I've written a
simple plugin that allows for auto-stubbing/mocking/spying on RequireJS dependencies.

## Usage

Set the plugin up w/ a convenient alias:

```javascript
requirejs.config({
    baseUrl:"/scripts",
    shim : {
        sinon : { //This is important - otherwise the plugin won't find sinon!
            exports : "sinon"
        }
    },
    paths:{
        "sinon" : "vendor/sinon/sinon", //point to wherever you have sinon.js
        "sinon-plugin" : "sinon-require-plugin" //point to wherever you have the plugin
    }

});
```

To test the example module:
```javascript

   define(function() {

        return {
            someMethod : function() {
               //do something..
            }
        };

   });

```

Then use in your module like so:

```javascript
define(["sinon-plugin!someModule"], function(wrappedModule) {

    var stubbedObject = wrappedModule.stub;
    var theModule = wrappedModule.module;

});
```

```javascript
define(["sinon-plugin!someModule#stub#someMethod"], function(module) {

    //will create a stub for just the method

     var stubbedMethod = wrappedModule.stub;
     var theModule = wrappedModule.module;

});
```

```javascript
define(["sinon-plugin!someModule#spy#someMethod"], function(module) {

    //will create a spy for the method

     var stubbedMethod = wrappedModule.spy;
     var theModule = wrappedModule.module;

});
```


## Notes

* No support for mocks at this point
* Does not support the RequireJS optimizer...this is not meant to be compiled, it's for testing!


Copyright (c) 2013 Mandarin Drummond
