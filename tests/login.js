var assert = require("assert");
var http = require("http");

describe('login tests', () => {
    
    describe('create user tests', () => {
        const server = require("../app");

        before(() => {
            server.listen(8000);
        });

        it('createUser', () => {

        });

        after(() => {
            server.close();
        });
    });

});