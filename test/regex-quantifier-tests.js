import {RegexQuantifier} from "../index.js";

QUnit.module("RegexQuantifier");

QUnit.test("Test RegexQuantifier constructor error", function (assert) {
    assert.throws(
        function () {
            new RegexQuantifier("test");
        },
        new Error("RegexQuantifier constructor is private")
    );
});
