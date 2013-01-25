define(['sinon'], function (sinon) {

    return {

        load : function (name, req, done, config) {

            var validSinonOperations = ["spy", "stub", "mock"];
            var parts = name.split("#"),
                module = parts[0],
                sinonOperation = parts[1] ? parts[1] : "stub",
                method = parts[2];

            if (validSinonOperations.indexOf(sinonOperation) === -1) {
                return done.error("Sinon method not supported by this plugin. " +
                    "Only " + validSinonOperations.join(", ") + " methods supported");
            }

            req([module], function(theModule) {

                var returnValue = {
                        module : theModule
                    };


                if (method) {
                    returnValue[sinonOperation] = sinon[sinonOperation](theModule, method);
                } else {
                    if (sinonOperation === "spy") {
                        return done.error("Spies not available for entire objects.");
                    }
                    returnValue[sinonOperation] = sinon[sinonOperation](theModule);
                }

                done(returnValue);

            });

        }
    };


});