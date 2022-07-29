"use strict";

var runAllTests = function(QUnit) {

    QUnit.test("TestText", function(assert)
    {
        var regex = new RegexBuilder()
            .text("a*b")
            .buildRegex();

        assert.equal(regex.toString(), "/a\\*b/");
    });

    QUnit.test("TestTextWithQuantifier", function(assert)
    {
        var regex = new RegexBuilder()
            .text("a*b", RegexQuantifier.oneOrMore)
            .buildRegex();

        assert.equal(regex.toString(), "/(?:a\\*b)+/");

    });

    QUnit.test("TestSimpleTextCaseInsensitive", function(assert)
    {
        var regex = new RegexBuilder()
            .text("cat")
            .buildRegex(RegexOptions.IGNORE_CASE);

        assert.equal(regex.toString(), "/cat/i");
    });

    QUnit.test("TestSimpleTextWithRegexCharacters", function(assert)
    {
        var regex = new RegexBuilder()
            .text("\\.+*?[]{}()|^$")
            .buildRegex();

        assert.equal(regex.toString(), "/\\\\\\.\\+\\*\\?\\[\\]\\{\\}\\(\\)\\|\\^\\$/");
    });

    QUnit.test("TestRegexText", function(assert)
    {
        var regex = new RegexBuilder()
            .regexText("^\\scat\\b")
            .buildRegex();

        assert.equal(regex.toString(), "/^\\scat\\b/");
    });

    QUnit.test("TestAnyCharacter", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacter()
            .buildRegex();

        assert.equal(regex.toString(), "/./");
    });

    QUnit.test("TestWhitespace", function(assert)
    {
        var regex = new RegexBuilder()
            .whitespace()
            .buildRegex();

        assert.equal(regex.toString(), "/\\s/");
    });

    QUnit.test("TestNonWhitespace", function(assert)
    {
        var regex = new RegexBuilder()
            .nonWhitespace()
            .buildRegex();

        assert.equal(regex.toString(), "/\\S/");
    });

    QUnit.test("TestDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .digit()
            .buildRegex();

        assert.equal(regex.toString(), "/\\d/");
    });

    QUnit.test("TestNonDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .nonDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/\\D/");
    });

    QUnit.test("TestLetter", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]/");
    });

    QUnit.test("TestNonLetter", function(assert)
    {
        var regex = new RegexBuilder()
            .nonLetter()
            .buildRegex();

        assert.equal(regex.toString(), "/[^a-zA-Z]/");
    });

    QUnit.test("TestUppercaseLetter", function(assert)
    {
        var regex = new RegexBuilder()
            .uppercaseLetter()
            .buildRegex();

        assert.equal(regex.toString(), "/[A-Z]/");
    });

    QUnit.test("TestLowercaseLetter", function(assert)
    {
        var regex = new RegexBuilder()
            .lowercaseLetter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-z]/");
    });

    QUnit.test("TestLetterOrDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .letterOrDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z0-9]/");
    });

    QUnit.test("TestNonLetterOrDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .nonLetterOrDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/[^a-zA-Z0-9]/");
    });

    QUnit.test("TestHexDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .hexDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/[0-9A-Fa-f]/");
    });

    QUnit.test("TestUppercaseHexDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .uppercaseHexDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/[0-9A-F]/");
    });

    QUnit.test("TestLowercaseHexDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .lowercaseHexDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/[0-9a-f]/");
    });

    QUnit.test("TestNonHexDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .nonHexDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/[^0-9A-Fa-f]/");
    });

    QUnit.test("TestWordCharacter", function(assert)
    {
        var regex = new RegexBuilder()
            .wordCharacter()
            .buildRegex();

        assert.equal(regex.toString(), "/\\w/");
    });

    QUnit.test("TestNonWordCharacter", function(assert)
    {
        var regex = new RegexBuilder()
            .nonWordCharacter()
            .buildRegex();

        assert.equal(regex.toString(), "/\\W/");
    });

    QUnit.test("TestAnyCharacterFrom", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacterFrom("cat")
            .buildRegex();

        assert.equal(regex.toString(), "/[cat]/");
    });

    QUnit.test("TestAnyCharacterFromWithCaretAtStart", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacterFrom("^abc")
            .buildRegex();

        assert.equal(regex.toString(), "/[\\^abc]/");
    });

    QUnit.test("TestAnyCharacterFromWithHyphen", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacterFrom("a-f")
            .buildRegex();

        assert.equal(regex.toString(), "/[a\\-f]/");
    });

    QUnit.test("TestAnyCharacterFromWithCaretNotAtStart", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacterFrom("a^bc")
            .buildRegex();

        assert.equal(regex.toString(), "/[a^bc]/");
    });

    QUnit.test("TestAnyCharacterExcept", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacterExcept("cat")
            .buildRegex();

        assert.equal(regex.toString(), "/[^cat]/");
    });

    QUnit.test("TestAnyOf", function(assert)
    {
        var regex = new RegexBuilder()
            .anyOf(["cat", "dog", "|"])
            .buildRegex();

        assert.equal(regex.toString(), "/(?:cat|dog|\\|)/");
    });

    QUnit.test("TestStartOfString", function(assert)
    {
        var regex = new RegexBuilder()
            .startOfString()
            .text("a")
            .buildRegex();

        assert.equal(regex.toString(), "/^a/");
    });

    QUnit.test("TestEndOfString", function(assert)
    {
        var regex = new RegexBuilder()
            .text("z")
            .endOfString()
            .buildRegex();

        assert.equal(regex.toString(), "/z$/");
    });

    QUnit.test("TestWordBoundary", function(assert)
    {
        var regex = new RegexBuilder()
            .text("a")
            .wordBoundary()
            .buildRegex();

        assert.equal(regex.toString(), "/a\\b/");
    });

    QUnit.test("TestSingleGroup", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.zeroOrMore)
            .startGroup()
                .letter()
                .digit()
            .endGroup()
            .buildRegex();

        assert.equal(regex.toString(), "/.*([a-zA-Z]\\d)/");
    });

    QUnit.test("TestNonCapturingGroup", function(assert)
    {
        var regex = new RegexBuilder()
            .lowercaseLetter(RegexQuantifier.oneOrMore)
            .startNonCapturingGroup()
                .digit(RegexQuantifier.oneOrMore)
            .endGroup()
            .lowercaseLetter(RegexQuantifier.oneOrMore)
            .buildRegex();

        assert.equal(regex.toString(), "/[a-z]+(?:\\d+)[a-z]+/");
    });

    QUnit.test("TestMultipleGroups", function(assert)
    {
        var regex = new RegexBuilder()
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

    QUnit.test("TestNestedGroups", function(assert)
    {
        var regex = new RegexBuilder()
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

    QUnit.test("TestZeroOrMore", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.zeroOrMore)
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d*[a-zA-Z]/");
    });

    QUnit.test("TestOneOrMore", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.oneOrMore)
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d+[a-zA-Z]/");
    });

    QUnit.test("TestOneOrNone", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.noneOrOne)
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d?[a-zA-Z]/");
    });

    QUnit.test("TestExactlyNTimes", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.exactly(3))
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d{3}[a-zA-Z]/");
    });

    QUnit.test("TestAtLeastQuantifier", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.atLeast(3))
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d{3,}[a-zA-Z]/");
    });

    QUnit.test("TestNoMoreThanQuantifier", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.noMoreThan(3))
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d{0,3}[a-zA-Z]/");
    });

    QUnit.test("TestBetweenMinMaxTimes", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.between(2, 4))
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d{2,4}[a-zA-Z]/");
    });

    QUnit.test("TestOptionMultiLine", function(assert)
    {
        var regex = new RegexBuilder()
            .startOfString()
            .text("find me!")
            .endOfString()
            .buildRegex(RegexOptions.MULTI_LINE);

        assert.equal(regex.toString(), "/^find me!$/m");
    });

    QUnit.test("TestOptionIgnoreCase", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacterFrom("cat")
            .buildRegex(RegexOptions.IGNORE_CASE);

        assert.equal(regex.toString(), "/[cat]/i");
    });

    QUnit.test("TestOptionMatchAll", function(assert)
    {
        var regex = new RegexBuilder()
            .text("cat")
            .buildRegex(RegexOptions.MATCH_ALL);

        var replaced = "catcatcat".replace(regex, "dog");

        assert.equal(regex.toString(), "/cat/g");
        assert.equal(replaced, "dogdogdog");
    });

    QUnit.test("TestAllOptions", function(assert)
    {
        var regex = new RegexBuilder()
            .startOfString()
            .anyCharacterFrom("cat")
            .buildRegex([RegexOptions.IGNORE_CASE, RegexOptions.MULTI_LINE, RegexOptions.MATCH_ALL]);

        assert.equal(regex.toString(), "/^[cat]/gim");
    });
    QUnit.test("TestExceptionGroupMismatch1", function(assert)
    {
        assert.throws(
            function(){
                new RegexBuilder()
                    .endGroup()
                    .buildRegex();
            },
            new Error("Cannot call endGroup() until a group has been started with startGroup()")
        );
    });

    QUnit.test("TestExceptionGroupMismatch2", function(assert)
    {
        assert.throws(
            function(){
                new RegexBuilder()
                    .startGroup()
                    .buildRegex();
            },
            new Error("One group is still open")
        );
    });

    QUnit.test("TestExceptionGroupMismatch3", function(assert)
    {
        assert.throws(
            function(){
                new RegexBuilder()
                    .startGroup()
                    .startGroup()
                    .endGroup()
                    .buildRegex();

            },
            new Error("One group is still open")
        );
    });

    QUnit.test("TestExceptionGroupMismatch4", function(assert)
    {
        assert.throws(
            function(){
                new RegexBuilder()
                    .startGroup()
                    .startGroup()
                    .buildRegex();

            },
            new Error("2 groups are still open")
        );
    });

    QUnit.test("TestExceptionGroupMismatch4", function(assert)
    {
        assert.throws(
            function(){
                new RegexBuilder()
                    .startGroup()
                    .startGroup()
                    .buildRegex();

            },
            new Error("2 groups are still open")
        );
    });

    QUnit.test("TestZeroOrMoreButAsFewAsPossible", function(assert)
    {
        var regex = new RegexBuilder()
            .digit(RegexQuantifier.zeroOrMore.butAsFewAsPossible())
            .buildRegex();

        assert.equal(regex.toString(), "/\\d*?/");
    });

    QUnit.test("TestOneOrMoreButAsFewAsPossible", function(assert)
    {
        var regex = new RegexBuilder()
            .digit(RegexQuantifier.oneOrMore.butAsFewAsPossible())
            .buildRegex();

        assert.equal(regex.toString(), "/\\d+?/");
    });

    QUnit.test("TestAtLeastButAsFewAsPossible", function(assert)
    {
        var regex = new RegexBuilder()
            .digit(RegexQuantifier.atLeast(1).butAsFewAsPossible())
            .buildRegex();

        assert.equal(regex.toString(), "/\\d{1,}?/");
    });

    QUnit.test("TestBetweenButAsFewAsPossible", function(assert)
    {
        var regex = new RegexBuilder()
            .digit(RegexQuantifier.between(2, 100).butAsFewAsPossible())
            .buildRegex();

        assert.equal(regex.toString(), "/\\d{2,100}?/");
    });

    QUnit.test("TestNoMoreThanButAsFewAsPossible", function(assert)
    {
        var regex = new RegexBuilder()
            .digit(RegexQuantifier.noMoreThan(2).butAsFewAsPossible())
            .buildRegex();

        assert.equal(regex.toString(), "/\\d{0,2}?/");
    });

    QUnit.test("TestNoneOrOneButAsFewAsPossible", function(assert)
    {
        var regex = new RegexBuilder()
            .digit(RegexQuantifier.noneOrOne.butAsFewAsPossible())
            .buildRegex();

        assert.equal(regex.toString(), "/\\d??/");
    });

    QUnit.test("TestExceptionButAsFewAsPossibleOnInvalidQuantifier", function(assert)
    {
        assert.throws(
            function(){
                new RegexBuilder()
                    .digit(RegexQuantifier.exactly(1).butAsFewAsPossible())
                    .buildRegex();
            },
            new Error("butAsFewAsPossible() can't be called on this quantifier")
        );
    });

    QUnit.test("TestExceptionButAsFewAsPossibleTwice", function(assert)
    {
        assert.throws(
            function(){
                new RegexBuilder()
                    .digit(RegexQuantifier.exactly(1).butAsFewAsPossible().butAsFewAsPossible())
                    .buildRegex();
            },
            new Error("butAsFewAsPossible() can't be called on this quantifier")
        );
    });

    QUnit.test("TestExceptionInvalidQuantifierRegexString", function(assert)
    {
        assert.throws(
            function(){
                new RegexQuantifier("test");
            },
            new Error("RegexQuantifier constructor is private")
        );
    });

    QUnit.test("TestExceptionTextNotString", function(assert)
    {
        assert.throws(
            function(){
                new RegexBuilder()
                    .text(true);
            },
            new Error("text must be a string")
        );
    });
};
