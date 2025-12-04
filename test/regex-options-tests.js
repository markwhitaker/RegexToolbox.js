import QUnit from "qunit";
import {RegexOptions} from "../index.js";

QUnit.module("RegexOptions");

QUnit.test("Test RegexOptions constructor error", function (assert) {
    assert.throws(
        function () {
            new RegexOptions("test");
        },
        new Error("RegexOptions constructor is private")
    );
});
