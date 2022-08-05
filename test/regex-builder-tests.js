"use strict";

import {RegexOptions, RegexQuantifier, RegexBuilder} from "../index.js";

QUnit.module("RegexBuilder");

QUnit.test("Test text()", assert => {
    const regex = new RegexBuilder()
        .text("a*b")
        .buildRegex();

    assert.equal(regex, "/a\\*b/");
});

QUnit.test("Test text() with quantifier", function (assert) {
    const regex = new RegexBuilder()
        .text("a*b", RegexQuantifier.oneOrMore)
        .buildRegex();

    assert.equal(regex, "/(?:a\\*b)+/");

});

QUnit.test("Test text() with regex characters", function (assert) {
    const regex = new RegexBuilder()
        .text("\\.+*?[]{}()|^$")
        .buildRegex();

    assert.equal(regex, "/\\\\\\.\\+\\*\\?\\[\\]\\{\\}\\(\\)\\|\\^\\$/");
});

QUnit.test("Test regexText()", function (assert) {
    const regex = new RegexBuilder()
        .regexText("^\\scat\\b")
        .buildRegex();

    assert.equal(regex, "/^\\scat\\b/");
});

QUnit.test("Test anyCharacter()", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacter()
        .buildRegex();

    assert.equal(regex, "/./");
});

QUnit.test("Test whitespace()", function (assert) {
    const regex = new RegexBuilder()
        .whitespace()
        .buildRegex();

    assert.equal(regex, "/\\s/");
});

QUnit.test("Test nonWhitespace()", function (assert) {
    const regex = new RegexBuilder()
        .nonWhitespace()
        .buildRegex();

    assert.equal(regex, "/\\S/");
});

QUnit.test("Test possibleWhitespace()", function (assert) {
    const regex = new RegexBuilder()
        .possibleWhitespace()
        .buildRegex();

    assert.equal(regex, "/\\s*/");
});

QUnit.test("Test space()", function (assert) {
    const regex = new RegexBuilder()
        .space()
        .buildRegex();

    assert.equal(regex, "/ /");
});

QUnit.test("Test tab()", function (assert) {
    const regex = new RegexBuilder()
        .tab()
        .buildRegex();

    assert.equal(regex, "/\\t/");
});

QUnit.test("Test carriageReturn()", function (assert) {
    const regex = new RegexBuilder()
        .carriageReturn()
        .buildRegex();

    assert.equal(regex, "/\\r/");
});

QUnit.test("Test lineFeed()", function (assert) {
    const regex = new RegexBuilder()
        .lineFeed()
        .buildRegex();

    assert.equal(regex, "/\\n/");
});

QUnit.test("Test digit()", function (assert) {
    const regex = new RegexBuilder()
        .digit()
        .buildRegex();

    assert.equal(regex, "/\\d/");
});

QUnit.test("Test nonDigit()", function (assert) {
    const regex = new RegexBuilder()
        .nonDigit()
        .buildRegex();

    assert.equal(regex, "/\\D/");
});

QUnit.test("Test letter()", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .buildRegex();

    assert.equal(regex, "/\\p{L}/u");
    assert.true(regex.test("a"));
    assert.true(regex.test("ß"));
    assert.true(regex.test("現"));
    assert.false(regex.test(""));
    assert.false(regex.test("1"));
    assert.false(regex.test("!"));
});

QUnit.test("Test nonLetter()", function (assert) {
    const regex = new RegexBuilder()
        .nonLetter()
        .buildRegex();

    assert.equal(regex, "/\\P{L}/u");
    assert.false(regex.test("a"));
    assert.false(regex.test("ß"));
    assert.false(regex.test("現"));
    assert.false(regex.test(""));
    assert.true(regex.test("1"));
    assert.true(regex.test("!"));
});

QUnit.test("Test uppercaseLetter()", function (assert) {
    const regex = new RegexBuilder()
        .uppercaseLetter()
        .buildRegex();

    assert.equal(regex, "/\\p{Lu}/u");
    assert.true(regex.test("A"));
    assert.false(regex.test("a"));
    assert.true(regex.test("ẞ"));
    assert.false(regex.test("ß"));
    assert.false(regex.test("現"));
    assert.false(regex.test(""));
    assert.false(regex.test("1"));
    assert.false(regex.test("!"));
});

QUnit.test("Test lowercaseLetter()", function (assert) {
    const regex = new RegexBuilder()
        .lowercaseLetter()
        .buildRegex();

    assert.equal(regex, "/\\p{Ll}/u");
    assert.false(regex.test("A"));
    assert.true(regex.test("a"));
    assert.false(regex.test("ẞ"));
    assert.true(regex.test("ß"));
    assert.false(regex.test("現"));
    assert.false(regex.test(""));
    assert.false(regex.test("1"));
    assert.false(regex.test("!"));
});

QUnit.test("Test letterOrDigit()", function (assert) {
    const regex = new RegexBuilder()
        .letterOrDigit()
        .buildRegex();

    assert.equal(regex, "/[\\p{L}0-9]/u");
    assert.true(regex.test("A"));
    assert.true(regex.test("a"));
    assert.true(regex.test("ẞ"));
    assert.true(regex.test("ß"));
    assert.true(regex.test("現"));
    assert.false(regex.test(""));
    assert.true(regex.test("1"));
    assert.false(regex.test("!"));
});

QUnit.test("Test nonLetterOrDigit()", function (assert) {
    const regex = new RegexBuilder()
        .nonLetterOrDigit()
        .buildRegex();

    assert.equal(regex, "/[^\\p{L}0-9]/u");
    assert.false(regex.test("A"));
    assert.false(regex.test("a"));
    assert.false(regex.test("ẞ"));
    assert.false(regex.test("ß"));
    assert.false(regex.test("現"));
    assert.false(regex.test(""));
    assert.false(regex.test("1"));
    assert.true(regex.test("!"));
});

QUnit.test("Test hexDigit()", function (assert) {
    const regex = new RegexBuilder()
        .hexDigit()
        .buildRegex();

    assert.equal(regex, "/[0-9A-Fa-f]/");
});

QUnit.test("Test uppercaseHexDigit()", function (assert) {
    const regex = new RegexBuilder()
        .uppercaseHexDigit()
        .buildRegex();

    assert.equal(regex, "/[0-9A-F]/");
});

QUnit.test("Test lowercaseHexDigit()", function (assert) {
    const regex = new RegexBuilder()
        .lowercaseHexDigit()
        .buildRegex();

    assert.equal(regex, "/[0-9a-f]/");
});

QUnit.test("Test nonHexDigit()", function (assert) {
    const regex = new RegexBuilder()
        .nonHexDigit()
        .buildRegex();

    assert.equal(regex, "/[^0-9A-Fa-f]/");
});

QUnit.test("Test wordCharacter()", function (assert) {
    const regex = new RegexBuilder()
        .wordCharacter()
        .buildRegex();

    assert.equal(regex, "/[\\p{L}0-9_]/u");
    assert.true(regex.test("a"));
    assert.true(regex.test("ẞ"));
    assert.true(regex.test("現"));
    assert.true(regex.test("_"));
    assert.true(regex.test("1"));
    assert.false(regex.test(""));
    assert.false(regex.test("!"));
});

QUnit.test("Test nonWordCharacter()", function (assert) {
    const regex = new RegexBuilder()
        .nonWordCharacter()
        .buildRegex();

    assert.equal(regex, "/[^\\p{L}0-9_]/u");
    assert.false(regex.test("a"));
    assert.false(regex.test("ẞ"));
    assert.false(regex.test("現"));
    assert.false(regex.test("_"));
    assert.false(regex.test("1"));
    assert.false(regex.test(""));
    assert.true(regex.test("!"));
});

QUnit.test("Test anyCharacterFrom()", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacterFrom("cat")
        .buildRegex();

    assert.equal(regex, "/[cat]/");
});

QUnit.test("Test anyCharacterFrom() with caret at start", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacterFrom("^abc")
        .buildRegex();

    assert.equal(regex, "/[\\^abc]/");
});

QUnit.test("Test anyCharacterFrom() with hyphen", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacterFrom("a-f")
        .buildRegex();

    assert.equal(regex, "/[a\\-f]/");
});

QUnit.test("Test anyCharacterFrom() with caret not at start", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacterFrom("a^bc")
        .buildRegex();

    assert.equal(regex, "/[a^bc]/");
});

QUnit.test("Test anyCharacterExcept()", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacterExcept("cat")
        .buildRegex();

    assert.equal(regex, "/[^cat]/");
});

QUnit.test("Test anyOf()", function (assert) {
    const regex = new RegexBuilder()
        .anyOf(["cat", "dog", "|"])
        .buildRegex();

    assert.equal(regex, "/(?:cat|dog|\\|)/");
});

QUnit.test("Test startOfString()", function (assert) {
    const regex = new RegexBuilder()
        .startOfString()
        .text("a")
        .buildRegex();

    assert.equal(regex, "/^a/");
});

QUnit.test("Test endOfString()", function (assert) {
    const regex = new RegexBuilder()
        .text("z")
        .endOfString()
        .buildRegex();

    assert.equal(regex, "/z$/");
});

QUnit.test("Test wordBoundary()", function (assert) {
    const regex = new RegexBuilder()
        .text("a")
        .wordBoundary()
        .buildRegex();

    assert.equal(regex, "/a\\b/");
});

QUnit.test("Test single group", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacter(RegexQuantifier.zeroOrMore)
        .group(regex => regex
            .letter()
            .digit()
        )
        .buildRegex();

    assert.equal(regex, "/.*(\\p{L}\\d)/u");
});

QUnit.test("Test non-capturing group", function (assert) {
    const regex = new RegexBuilder()
        .lowercaseLetter(RegexQuantifier.oneOrMore)
        .nonCapturingGroup(regex => regex
            .digit(RegexQuantifier.oneOrMore)
        )
        .lowercaseLetter(RegexQuantifier.oneOrMore)
        .buildRegex();

    assert.equal(regex, "/\\p{Ll}+(?:\\d+)\\p{Ll}+/u");
});

QUnit.test("Test named group", function (assert) {
    const regex = new RegexBuilder()
        .lowercaseLetter(RegexQuantifier.oneOrMore)
        .namedGroup("test", regex => regex
            .digit(RegexQuantifier.oneOrMore)
        )
        .lowercaseLetter(RegexQuantifier.oneOrMore)
        .buildRegex();

    assert.equal(regex, "/\\p{Ll}+(?<test>\\d+)\\p{Ll}+/u");
});

QUnit.test("Test multiple groups", function (assert) {
    const regex = new RegexBuilder()
        .group(regex => regex
            .anyCharacter(RegexQuantifier.zeroOrMore)
        )
        .group(regex => regex
            .letter()
            .digit()
        )
        .buildRegex();

    assert.equal(regex, "/(.*)(\\p{L}\\d)/u");
});

QUnit.test("Test nested groups", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacter() // Omit first character from groups
        .group(regex1 => regex1
            .anyCharacter(RegexQuantifier.zeroOrMore)
            .group(regex2 => regex2
                .letter()
                .digit()
            )
        )
        .buildRegex();

    assert.equal(regex, "/.(.*(\\p{L}\\d))/u");
});

QUnit.test("Test zeroOrMore quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.zeroOrMore)
        .letter()
        .buildRegex();

    assert.equal(regex, "/\\p{L}\\d*\\p{L}/u");
});

QUnit.test("Test oneOrMore quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.oneOrMore)
        .letter()
        .buildRegex();

    assert.equal(regex, "/\\p{L}\\d+\\p{L}/u");
});

QUnit.test("Test oneOrNone quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.noneOrOne)
        .letter()
        .buildRegex();

    assert.equal(regex, "/\\p{L}\\d?\\p{L}/u");
});

QUnit.test("Test exactly() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.exactly(3))
        .letter()
        .buildRegex();

    assert.equal(regex, "/\\p{L}\\d{3}\\p{L}/u");
});

QUnit.test("Test atLeast() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.atLeast(3))
        .letter()
        .buildRegex();

    assert.equal(regex, "/\\p{L}\\d{3,}\\p{L}/u");
});

QUnit.test("Test noMoreThan() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.noMoreThan(3))
        .letter()
        .buildRegex();

    assert.equal(regex, "/\\p{L}\\d{0,3}\\p{L}/u");
});

QUnit.test("Test between() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .letter()
        .digit(RegexQuantifier.between(2, 4))
        .letter()
        .buildRegex();

    assert.equal(regex, "/\\p{L}\\d{2,4}\\p{L}/u");
});

QUnit.test("Test MULTI_LINE option", function (assert) {
    const regex = new RegexBuilder()
        .startOfString()
        .text("find me!")
        .endOfString()
        .buildRegex(RegexOptions.MULTI_LINE);

    assert.equal(regex, "/^find me!$/m");
});

QUnit.test("Test IGNORE_CASE option", function (assert) {
    const regex = new RegexBuilder()
        .anyCharacterFrom("cat")
        .buildRegex(RegexOptions.IGNORE_CASE);

    assert.equal(regex, "/[cat]/i");
});

QUnit.test("Test MATCH_ALL option", function (assert) {
    const regex = new RegexBuilder()
        .text("cat")
        .buildRegex(RegexOptions.MATCH_ALL);

    const replaced = "catcatcat".replace(regex, "dog");

    assert.equal(regex, "/cat/g");
    assert.equal(replaced, "dogdogdog");
});

QUnit.test("Test all options", function (assert) {
    const regex = new RegexBuilder()
        .startOfString()
        .anyCharacterFrom("cat")
        .buildRegex([RegexOptions.IGNORE_CASE, RegexOptions.MULTI_LINE, RegexOptions.MATCH_ALL]);

    assert.equal(regex, "/^[cat]/gim");
});

QUnit.test("Test invalid option", function (assert) {
    assert.throws(function(){
        new RegexBuilder()
            .buildRegex(1);
    }, new Error("All options passed to constructor must be of type RegexOptions"));

    assert.throws(function(){
        new RegexBuilder()
            .buildRegex("i");
    }, new Error("All options passed to constructor must be of type RegexOptions"));

    assert.throws(function(){
        new RegexBuilder()
            .buildRegex(true);
    }, new Error("All options passed to constructor must be of type RegexOptions"));
});

QUnit.test("Test zeroOrMore.butAsFewAsPossible() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .digit(RegexQuantifier.zeroOrMore.butAsFewAsPossible())
        .buildRegex();

    assert.equal(regex, "/\\d*?/");
});

QUnit.test("Test oneOrMore.butAsFewAsPossible() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .digit(RegexQuantifier.oneOrMore.butAsFewAsPossible())
        .buildRegex();

    assert.equal(regex, "/\\d+?/");
});

QUnit.test("Test atLeast().butAsFewAsPossible() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .digit(RegexQuantifier.atLeast(1).butAsFewAsPossible())
        .buildRegex();

    assert.equal(regex, "/\\d{1,}?/");
});

QUnit.test("Test between().butAsFewAsPossible() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .digit(RegexQuantifier.between(2, 100).butAsFewAsPossible())
        .buildRegex();

    assert.equal(regex, "/\\d{2,100}?/");
});

QUnit.test("Test noMoreThan().butAsFewAsPossible() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .digit(RegexQuantifier.noMoreThan(2).butAsFewAsPossible())
        .buildRegex();

    assert.equal(regex, "/\\d{0,2}?/");
});

QUnit.test("Test noneOrOne.butAsFewAsPossible() quantifier", function (assert) {
    const regex = new RegexBuilder()
        .digit(RegexQuantifier.noneOrOne.butAsFewAsPossible())
        .buildRegex();

    assert.equal(regex, "/\\d??/");
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
