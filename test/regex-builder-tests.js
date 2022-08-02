"use strict";

import {RegexOptions, RegexQuantifier, RegexBuilder} from "../index.js";

QUnit.module("RegexBuilder");

QUnit.test("Test text()", assert => {
    const regex = new RegexBuilder()
        .text("a*b")
        .buildRegex();

    assert.equal(regex.toString(), "/a\\*b/");
});

QUnit.test("Test text() with quantifier", function (assert) {
    const regex = new RegexBuilder()
        .text("a*b", RegexQuantifier.oneOrMore)
        .buildRegex();

    assert.equal(regex.toString(), "/(?:a\\*b)+/");

});

QUnit.test("Test text() with regex characters", function (assert) {
    const regex = new RegexBuilder()
        .text("\\.+*?[]{}()|^$")
        .buildRegex();

    assert.equal(regex.toString(), "/\\\\\\.\\+\\*\\?\\[\\]\\{\\}\\(\\)\\|\\^\\$/");
});

QUnit.test("Test regexText()", function (assert) {
    const regex = new RegexBuilder()
        .regexText("^\\scat\\b")
        .buildRegex();

    assert.equal(regex.toString(), "/^\\scat\\b/");
});

QUnit.test("Test anyCharacter()", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacter()
        .buildRegex();

    assert.equal(regex.toString(), "/./");
});

QUnit.test("Test whitespace()", function (assert) {
    const regex = new RegexBuilder()
        .whitespace()
        .buildRegex();

    assert.equal(regex.toString(), "/\\s/");
});

QUnit.test("Test nonWhitespace()", function (assert) {
    const regex = new RegexBuilder()
        .nonWhitespace()
        .buildRegex();

    assert.equal(regex.toString(), "/\\S/");
});

QUnit.test("Test digit()", function (assert) {
    const regex = new RegexBuilder()
        .digit()
        .buildRegex();

    assert.equal(regex.toString(), "/\\d/");
});

QUnit.test("Test nonDigit()", function (assert) {
    const regex = new RegexBuilder()
        .nonDigit()
        .buildRegex();

    assert.equal(regex.toString(), "/\\D/");
});

QUnit.test("Test letter()", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .buildRegex();

    assert.equal(regex.toString(), "/[a-zA-Z]/");
});

QUnit.test("Test nonLetter()", function (assert) {
    const regex = new RegexBuilder()
        .nonLetter()
        .buildRegex();

    assert.equal(regex.toString(), "/[^a-zA-Z]/");
});

QUnit.test("Test uppercaseLetter()", function (assert) {
    const regex = new RegexBuilder()
        .uppercaseLetter()
        .buildRegex();

    assert.equal(regex.toString(), "/[A-Z]/");
});

QUnit.test("Test lowercaseLetter()", function (assert) {
    const regex = new RegexBuilder()
        .lowercaseLetter()
        .buildRegex();

    assert.equal(regex.toString(), "/[a-z]/");
});

QUnit.test("Test letterOrDigit()", function (assert) {
    const regex = new RegexBuilder()
        .letterOrDigit()
        .buildRegex();

    assert.equal(regex.toString(), "/[a-zA-Z0-9]/");
});

QUnit.test("Test nonLetterOrDigit()", function (assert) {
    const regex = new RegexBuilder()
        .nonLetterOrDigit()
        .buildRegex();

    assert.equal(regex.toString(), "/[^a-zA-Z0-9]/");
});

QUnit.test("Test hexDigit()", function (assert) {
    const regex = new RegexBuilder()
        .hexDigit()
        .buildRegex();

    assert.equal(regex.toString(), "/[0-9A-Fa-f]/");
});

QUnit.test("Test uppercaseHexDigit()", function (assert) {
    const regex = new RegexBuilder()
        .uppercaseHexDigit()
        .buildRegex();

    assert.equal(regex.toString(), "/[0-9A-F]/");
});

QUnit.test("Test lowercaseHexDigit()", function (assert) {
    const regex = new RegexBuilder()
        .lowercaseHexDigit()
        .buildRegex();

    assert.equal(regex.toString(), "/[0-9a-f]/");
});

QUnit.test("Test nonHexDigit()", function (assert) {
    const regex = new RegexBuilder()
        .nonHexDigit()
        .buildRegex();

    assert.equal(regex.toString(), "/[^0-9A-Fa-f]/");
});

QUnit.test("Test wordCharacter()", function (assert) {
    const regex = new RegexBuilder()
        .wordCharacter()
        .buildRegex();

    assert.equal(regex.toString(), "/\\w/");
});

QUnit.test("Test nonWordCharacter()", function (assert) {
    const regex = new RegexBuilder()
        .nonWordCharacter()
        .buildRegex();

    assert.equal(regex.toString(), "/\\W/");
});

QUnit.test("Test anyCharacterFrom()", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacterFrom("cat")
        .buildRegex();

    assert.equal(regex.toString(), "/[cat]/");
});

QUnit.test("Test anyCharacterFrom() with caret at start", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacterFrom("^abc")
        .buildRegex();

    assert.equal(regex.toString(), "/[\\^abc]/");
});

QUnit.test("Test anyCharacterFrom() with hyphen", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacterFrom("a-f")
        .buildRegex();

    assert.equal(regex.toString(), "/[a\\-f]/");
});

QUnit.test("Test anyCharacterFrom() with caret not at start", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacterFrom("a^bc")
        .buildRegex();

    assert.equal(regex.toString(), "/[a^bc]/");
});

QUnit.test("Test anyCharacterExcept()", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacterExcept("cat")
        .buildRegex();

    assert.equal(regex.toString(), "/[^cat]/");
});

QUnit.test("Test anyOf()", function (assert) {
    const regex = new RegexBuilder()
        .anyOf(["cat", "dog", "|"])
        .buildRegex();

    assert.equal(regex.toString(), "/(?:cat|dog|\\|)/");
});

QUnit.test("Test startOfString()", function (assert) {
    const regex = new RegexBuilder()
        .startOfString()
        .text("a")
        .buildRegex();

    assert.equal(regex.toString(), "/^a/");
});

QUnit.test("Test endOfString()", function (assert) {
    const regex = new RegexBuilder()
        .text("z")
        .endOfString()
        .buildRegex();

    assert.equal(regex.toString(), "/z$/");
});

QUnit.test("Test wordBoundary()", function (assert) {
    const regex = new RegexBuilder()
        .text("a")
        .wordBoundary()
        .buildRegex();

    assert.equal(regex.toString(), "/a\\b/");
});

QUnit.test("Test single group", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacter(RegexQuantifier.zeroOrMore)
        .startGroup()
        .letter()
        .digit()
        .endGroup()
        .buildRegex();

    assert.equal(regex.toString(), "/.*([a-zA-Z]\\d)/");
});

QUnit.test("Test non-capturing group", function (assert) {
    const regex = new RegexBuilder()
        .lowercaseLetter(RegexQuantifier.oneOrMore)
        .startNonCapturingGroup()
        .digit(RegexQuantifier.oneOrMore)
        .endGroup()
        .lowercaseLetter(RegexQuantifier.oneOrMore)
        .buildRegex();

    assert.equal(regex.toString(), "/[a-z]+(?:\\d+)[a-z]+/");
});

QUnit.test("Test multiple groups", function (assert) {
    const regex = new RegexBuilder()
        .startGroup()
        .anyCharacter(RegexQuantifier.zeroOrMore)
        .endGroup()
        .startGroup()
        .letter()
        .digit()
        .endGroup()
        .buildRegex();

    assert.equal(regex.toString(), "/(.*)([a-zA-Z]\\d)/");
});

QUnit.test("Test nested groups", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacter() // Omit first character from groups
        .startGroup()
        .anyCharacter(RegexQuantifier.zeroOrMore)
        .startGroup()
        .letter()
        .digit()
        .endGroup()
        .endGroup()
        .buildRegex();

    assert.equal(regex.toString(), "/.(.*([a-zA-Z]\\d))/");
});

QUnit.test("Test zeroOrMore quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.zeroOrMore)
        .letter()
        .buildRegex();

    assert.equal(regex.toString(), "/[a-zA-Z]\\d*[a-zA-Z]/");
});

QUnit.test("Test oneOrMore quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.oneOrMore)
        .letter()
        .buildRegex();

    assert.equal(regex.toString(), "/[a-zA-Z]\\d+[a-zA-Z]/");
});

QUnit.test("Test oneOrNone quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.noneOrOne)
        .letter()
        .buildRegex();

    assert.equal(regex.toString(), "/[a-zA-Z]\\d?[a-zA-Z]/");
});

QUnit.test("Test exactly() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.exactly(3))
        .letter()
        .buildRegex();

    assert.equal(regex.toString(), "/[a-zA-Z]\\d{3}[a-zA-Z]/");
});

QUnit.test("Test atLeast() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.atLeast(3))
        .letter()
        .buildRegex();

    assert.equal(regex.toString(), "/[a-zA-Z]\\d{3,}[a-zA-Z]/");
});

QUnit.test("Test noMoreThan() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.noMoreThan(3))
        .letter()
        .buildRegex();

    assert.equal(regex.toString(), "/[a-zA-Z]\\d{0,3}[a-zA-Z]/");
});

QUnit.test("Test between() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.between(2, 4))
        .letter()
        .buildRegex();

    assert.equal(regex.toString(), "/[a-zA-Z]\\d{2,4}[a-zA-Z]/");
});

QUnit.test("Test MULTI_LINE option", function (assert) {
    const regex = new RegexBuilder()
        .startOfString()
        .text("find me!")
        .endOfString()
        .buildRegex(RegexOptions.MULTI_LINE);

    assert.equal(regex.toString(), "/^find me!$/m");
});

QUnit.test("Test IGNORE_CASE option", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacterFrom("cat")
        .buildRegex(RegexOptions.IGNORE_CASE);

    assert.equal(regex.toString(), "/[cat]/i");
});

QUnit.test("Test MATCH_ALL option", function (assert) {
    const regex = new RegexBuilder()
        .text("cat")
        .buildRegex(RegexOptions.MATCH_ALL);

    const replaced = "catcatcat".replace(regex, "dog");

    assert.equal(regex.toString(), "/cat/g");
    assert.equal(replaced, "dogdogdog");
});

QUnit.test("Test all options", function (assert) {
    const regex = new RegexBuilder()
        .startOfString()
        .anyCharacterFrom("cat")
        .buildRegex([RegexOptions.IGNORE_CASE, RegexOptions.MULTI_LINE, RegexOptions.MATCH_ALL]);

    assert.equal(regex.toString(), "/^[cat]/gim");
});
QUnit.test("Test non-started group error", function (assert) {
    assert.throws(
        function () {
            new RegexBuilder()
                .endGroup()
                .buildRegex();
        },
        new Error("Cannot call endGroup() until a group has been started with startGroup()")
    );
});

QUnit.test("Test non-ended group error (1)", function (assert) {
    assert.throws(
        function () {
            new RegexBuilder()
                .startGroup()
                .buildRegex();
        },
        new Error("One group is still open")
    );
});

QUnit.test("Test non-ended group error (2)", function (assert) {
    assert.throws(
        function () {
            new RegexBuilder()
                .startGroup()
                .startGroup()
                .endGroup()
                .buildRegex();

        },
        new Error("One group is still open")
    );
});

QUnit.test("Test multiple non-ended groups error", function (assert) {
    assert.throws(
        function () {
            new RegexBuilder()
                .startGroup()
                .startGroup()
                .buildRegex();

        },
        new Error("2 groups are still open")
    );
});

QUnit.test("Test zeroOrMore.butAsFewAsPossible() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .digit(RegexQuantifier.zeroOrMore.butAsFewAsPossible())
        .buildRegex();

    assert.equal(regex.toString(), "/\\d*?/");
});

QUnit.test("Test oneOrMore.butAsFewAsPossible() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .digit(RegexQuantifier.oneOrMore.butAsFewAsPossible())
        .buildRegex();

    assert.equal(regex.toString(), "/\\d+?/");
});

QUnit.test("Test atLeast().butAsFewAsPossible() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .digit(RegexQuantifier.atLeast(1).butAsFewAsPossible())
        .buildRegex();

    assert.equal(regex.toString(), "/\\d{1,}?/");
});

QUnit.test("Test between().butAsFewAsPossible() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .digit(RegexQuantifier.between(2, 100).butAsFewAsPossible())
        .buildRegex();

    assert.equal(regex.toString(), "/\\d{2,100}?/");
});

QUnit.test("Test noMoreThan().butAsFewAsPossible() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .digit(RegexQuantifier.noMoreThan(2).butAsFewAsPossible())
        .buildRegex();

    assert.equal(regex.toString(), "/\\d{0,2}?/");
});

QUnit.test("Test noneOrOne.butAsFewAsPossible() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .digit(RegexQuantifier.noneOrOne.butAsFewAsPossible())
        .buildRegex();

    assert.equal(regex.toString(), "/\\d??/");
});

QUnit.test("Test exactly().butAsFewAsPossible() quantifier error", function (assert) {
    assert.throws(
        function () {
            new RegexBuilder()
                .digit(RegexQuantifier.exactly(1).butAsFewAsPossible())
                .buildRegex();
        },
        new Error("butAsFewAsPossible() can't be called on this quantifier")
    );
});

QUnit.test("Test butAsFewAsPossible().butAsFewAsPossible() error ", function (assert) {
    assert.throws(
        function () {
            new RegexBuilder()
                .digit(RegexQuantifier.oneOrMore.butAsFewAsPossible().butAsFewAsPossible())
                .buildRegex();
        },
        new Error("butAsFewAsPossible() can't be called on this quantifier")
    );
});

QUnit.test("Test text not string error", function (assert) {
    assert.throws(
        function () {
            new RegexBuilder()
                .text(true);
        },
        new Error("text must be a string")
    );
});
