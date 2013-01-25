define([ "chai", "sinon-helper"], function(chai, sinonPlugin){

    chai.Should();

    describe("load", function(){

        var pureStubs = {},
            wrappedStubs = {};

        beforeEach(function() {
            pureStubs.require = sinon.stub();
            pureStubs.doneLoading = sinon.stub();
            pureStubs.errorLoading = sinon.stub();
            pureStubs.doneLoading.error = pureStubs.errorLoading;

        });

        it("should call error callback if invalid sinon operation requested", function() {

            sinonPlugin.load("someModule#blah", pureStubs.require, pureStubs.doneLoading, {});

            pureStubs.errorLoading.called.should.be.true;

        });

        describe("when valid operation requested", function(){


            describe("if 'spy' operation requested", function(){


                it("should call the require callback", function() {

                    sinonPlugin.load("someModule#spy", pureStubs.require, pureStubs.doneLoading, {});

                    pureStubs.require.called.should.be.true;

                });

                describe("when the method is NOT passed", function(){

                    var theFakeModule;

                    beforeEach(function() {
                        theFakeModule = {someMethod : function() {}};
                        pureStubs.require.callsArgWith(1, theFakeModule)

                        sinonPlugin.load("someModule#spy", pureStubs.require, pureStubs.doneLoading, {});
                    });


                    it("should call the error callback", function() {

                        pureStubs.errorLoading.called.should.be.true;


                    });
                });

                describe("when method is passed", function(){

                    var theFakeModule;

                    beforeEach(function() {
                        theFakeModule = {someMethod : function() {}};
                        pureStubs.require.callsArgWith(1, theFakeModule);

                        sinonPlugin.load("someModule#spy#someMethod", pureStubs.require, pureStubs.doneLoading, {});
                    });

                    it("should call the doneLoading callback", function() {

                        pureStubs.doneLoading.called.should.be.true;

                    });

                    it("should return the spy", function(){

                        pureStubs.doneLoading.firstCall.args[0].spy.should.equal(theFakeModule.someMethod);

                    });

                    it("should return the module", function(){

                        pureStubs.doneLoading.firstCall.args[0].module.should.equal(theFakeModule);

                    });
                });
            });

            describe("if 'stub' operation requested", function(){


                it("should call the require callback", function() {

                    sinonPlugin.load("someModule#stub", pureStubs.require, pureStubs.doneLoading, {});

                    pureStubs.require.called.should.be.true;

                });

                describe("when the method is NOT passed", function(){

                    var theFakeModule;

                    beforeEach(function() {

                        theFakeModule = {someMethod : function() {}};
                        pureStubs.require.callsArgWith(1, theFakeModule);

                        sinonPlugin.load("someModule#stub", pureStubs.require, pureStubs.doneLoading, {});
                    });


                    it("should return the module", function() {

                        pureStubs.doneLoading.firstCall.args[0].module.should.equal(theFakeModule);


                    });

                    it("should return the stub", function() {

                        //The module is a stubbed module, so this is correct, even though it looks strange..
                        pureStubs.doneLoading.firstCall.args[0].stub.should.equal(theFakeModule);

                        //Proving methods are stubbed:
                        pureStubs.doneLoading.firstCall.args[0].stub.someMethod();
                        pureStubs.doneLoading.firstCall.args[0].stub.someMethod.called.should.be.true;


                    });
                });
            });

            describe("if the 'mock' operation requested", function(){

                beforeEach(function() {

                    sinonPlugin.load("someModule#mock", pureStubs.require, pureStubs.doneLoading, {});

                });

                it("should call the require callback", function() {

                    pureStubs.require.called.should.be.true;

                });
            });



        });



    });

});