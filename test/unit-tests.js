"use strict";

var runAllTests = function(QUnit) {

    var Strings = {
        BothCaseAlphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        UpperCaseAlphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        LowerCaseAlphabet: "abcdefghijklmnopqrstuvwxyz",
        DecimalDigits: "0123456789",
        BothCaseHexDigits: "0123456789ABCDEFabcdef",
        UpperCaseHexDigits: "0123456789ABCDEF",
        LowerCaseHexDigits: "0123456789abcdef",
        Symbols: "!\"\\|£$%^&*()-=_+[]{},'#:@~,./<>?",
        WhiteSpace: " \t\n\r\v\f",
        ControlCharacters: "\b",
        Empty: "",
        SimpleName: "Jo Smith",
        SimpleEmailAddress: "regex.toolbox@mainwave.co.uk",
        SimpleHttpUrl: "http://www.website.com/",
        SimpleHttpsUrl: "https://www.website.com/",
        Ipv4Address: "172.15.254.1",
        Ipv6Address: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        MacAddress: "00:3e:e1:c4:5d:df"
    };

    QUnit.test("TestSimpleText", function(assert)
    {
        var regex = new RegexBuilder()
            .text("cat")
            .buildRegex();

        assert.equal(regex.toString(), "/cat/");
        assert.ok(regex.test("cat"));
        assert.ok(regex.test("scatter"));
        assert.notOk(regex.test("Cat"));
        assert.notOk(regex.test("dog"));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestSimpleTextWithQuantifier", function(assert)
    {
        var regex = new RegexBuilder()
            .text("cat", RegexQuantifier.exactly(2))
            .buildRegex();

        assert.equal(regex.toString(), "/(?:cat){2}/");
        assert.notOk(regex.test("cat"));
        assert.ok(regex.test("catcat"));
        assert.ok(regex.test("catcatcat"));
        assert.notOk(regex.test("scatter"));
        assert.notOk(regex.test("Cat"));
        assert.notOk(regex.test("dog"));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestSimpleTextCaseInsensitive", function(assert)
    {
        var regex = new RegexBuilder()
            .text("cat")
            .buildRegex(RegexOptions.IGNORE_CASE);

        assert.equal(regex.toString(), "/cat/i");
        assert.ok(regex.test("cat"));
        assert.ok(regex.test("scatter"));
        assert.ok(regex.test("Cat"));
        assert.notOk(regex.test("dog"));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestSimpleTextWithRegexCharacters", function(assert)
    {
        var regex = new RegexBuilder()
            .text("\\.+*?[]{}()|^$")
            .buildRegex();

        assert.equal(regex.toString(), "/\\\\\\.\\+\\*\\?\\[\\]\\{\\}\\(\\)\\|\\^\\$/");
        assert.ok(regex.test("\\.+*?[]{}()|^$"));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestRegexText", function(assert)
    {
        var regex = new RegexBuilder()
            .regexText("^\\scat\\b")
            .buildRegex();

        assert.equal(regex.toString(), "/^\\scat\\b/");
        assert.ok(regex.test(" cat"));
        assert.ok(regex.test(" cat."));
        assert.ok(regex.test("\tcat "));
        assert.ok(regex.test(" cat-"));
        assert.ok(regex.test(" cat "));
        assert.notOk(regex.test("cat"));
        assert.notOk(regex.test(" catheter"));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestAnyCharacter", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacter()
            .buildRegex();

        assert.equal(regex.toString(), "/./");
        assert.ok(regex.test(" "));
        assert.ok(regex.test("a"));
        assert.ok(regex.test("1"));
        assert.ok(regex.test("\\"));
        assert.notOk(regex.test(""));
        assert.notOk(regex.test("\n"));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.ok(regex.test(Strings.WhiteSpace));
        assert.ok(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestWhitespace", function(assert)
    {
        var regex = new RegexBuilder()
            .whitespace()
            .buildRegex();

        assert.equal(regex.toString(), "/\\s/");
        assert.ok(regex.test(" "));
        assert.ok(regex.test("\t"));
        assert.ok(regex.test("\r"));
        assert.ok(regex.test("\n"));
        assert.ok(regex.test("\r\n"));
        assert.ok(regex.test("\t \t"));
        assert.ok(regex.test("                hi!"));
        assert.notOk(regex.test("cat"));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.ok(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestNonWhitespace", function(assert)
    {
        var regex = new RegexBuilder()
            .nonWhitespace()
            .buildRegex();

        assert.equal(regex.toString(), "/\\S/");
        assert.ok(regex.test("a"));
        assert.ok(regex.test("1"));
        assert.ok(regex.test("-"));
        assert.ok(regex.test("*"));
        assert.ok(regex.test("abc"));
        assert.ok(regex.test("                hi!"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test("\t"));
        assert.notOk(regex.test("\r"));
        assert.notOk(regex.test("\n"));
        assert.notOk(regex.test("\t\t\r\n   "));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.ok(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .digit()
            .buildRegex();

        assert.equal(regex.toString(), "/\\d/");
        assert.ok(regex.test("1"));
        assert.ok(regex.test("0"));
        assert.ok(regex.test("999"));
        assert.ok(regex.test("there's a digit in here s0mewhere"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test("abc"));
        assert.notOk(regex.test("xFFF"));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestNonDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .nonDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/\\D/");
        assert.ok(regex.test(" 1"));
        assert.ok(regex.test("a0"));
        assert.ok(regex.test("999_"));
        assert.ok(regex.test("1,000"));
        assert.ok(regex.test("there's a digit in here s0mewhere"));
        assert.notOk(regex.test("1"));
        assert.notOk(regex.test("0"));
        assert.notOk(regex.test("999"));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.ok(regex.test(Strings.WhiteSpace));
        assert.ok(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestLetter", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]/");
        assert.ok(regex.test("a"));
        assert.ok(regex.test("A"));
        assert.ok(regex.test("        z"));
        assert.ok(regex.test("text with spaces"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test("1"));
        assert.notOk(regex.test("%"));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestNonLetter", function(assert)
    {
        var regex = new RegexBuilder()
            .nonLetter()
            .buildRegex();

        assert.equal(regex.toString(), "/[^a-zA-Z]/");
        assert.ok(regex.test(" 1"));
        assert.ok(regex.test("0"));
        assert.ok(regex.test("999_"));
        assert.ok(regex.test("1,000"));
        assert.ok(regex.test("text with spaces"));
        assert.notOk(regex.test("a"));
        assert.notOk(regex.test("ZZZ"));
        assert.notOk(regex.test(""));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.ok(regex.test(Strings.WhiteSpace));
        assert.ok(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestUppercaseLetter", function(assert)
    {
        var regex = new RegexBuilder()
            .uppercaseLetter()
            .buildRegex();

        assert.equal(regex.toString(), "/[A-Z]/");
        assert.ok(regex.test("A"));
        assert.ok(regex.test("        Z"));
        assert.ok(regex.test("text with Spaces"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test("1"));
        assert.notOk(regex.test("%"));
        assert.notOk(regex.test("s"));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestLowercaseLetter", function(assert)
    {
        var regex = new RegexBuilder()
            .lowercaseLetter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-z]/");
        assert.ok(regex.test("a"));
        assert.ok(regex.test("        z"));
        assert.ok(regex.test("text with Spaces"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test("1"));
        assert.notOk(regex.test("%"));
        assert.notOk(regex.test("S"));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestLetterOrDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .letterOrDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z0-9]/");
        assert.ok(regex.test("A"));
        assert.ok(regex.test("        Z"));
        assert.ok(regex.test("text with Spaces"));
        assert.notOk(regex.test(" "));
        assert.ok(regex.test("1"));
        assert.notOk(regex.test("%"));
        assert.notOk(regex.test("_"));
        assert.ok(regex.test("s"));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestNonLetterOrDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .nonLetterOrDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/[^a-zA-Z0-9]/");
        assert.notOk(regex.test("A"));
        assert.ok(regex.test("        Z"));
        assert.ok(regex.test("text with Spaces"));
        assert.ok(regex.test(" "));
        assert.notOk(regex.test("1"));
        assert.ok(regex.test("%"));
        assert.ok(regex.test("_"));
        assert.notOk(regex.test("s"));
        assert.notOk(regex.test(""));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.ok(regex.test(Strings.WhiteSpace));
        assert.ok(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestHexDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .hexDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/[0-9A-Fa-f]/");
        assert.ok(regex.test("A"));
        assert.ok(regex.test("        f"));
        assert.ok(regex.test("text with Spaces"));
        assert.notOk(regex.test(" "));
        assert.ok(regex.test("1"));
        assert.notOk(regex.test("%"));
        assert.notOk(regex.test("_"));
        assert.notOk(regex.test("s"));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestUppercaseHexDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .uppercaseHexDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/[0-9A-F]/");
        assert.ok(regex.test("A"));
        assert.notOk(regex.test("        f"));
        assert.notOk(regex.test("text with Spaces"));
        assert.notOk(regex.test(" "));
        assert.ok(regex.test("1"));
        assert.notOk(regex.test("%"));
        assert.notOk(regex.test("_"));
        assert.notOk(regex.test("s"));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestLowercaseHexDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .lowercaseHexDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/[0-9a-f]/");
        assert.notOk(regex.test("A"));
        assert.ok(regex.test("        f"));
        assert.ok(regex.test("text with Spaces"));
        assert.notOk(regex.test(" "));
        assert.ok(regex.test("1"));
        assert.notOk(regex.test("%"));
        assert.notOk(regex.test("_"));
        assert.notOk(regex.test("s"));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestNonHexDigit", function(assert)
    {
        var regex = new RegexBuilder()
            .nonHexDigit()
            .buildRegex();

        assert.equal(regex.toString(), "/[^0-9A-Fa-f]/");
        assert.notOk(regex.test("A"));
        assert.ok(regex.test("        f"));
        assert.ok(regex.test("text with Spaces"));
        assert.ok(regex.test(" "));
        assert.notOk(regex.test("1"));
        assert.ok(regex.test("%"));
        assert.ok(regex.test("_"));
        assert.ok(regex.test("s"));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.ok(regex.test(Strings.WhiteSpace));
        assert.ok(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestWordCharacter", function(assert)
    {
        var regex = new RegexBuilder()
            .wordCharacter()
            .buildRegex();

        assert.equal(regex.toString(), "/\\w/");
        assert.ok(regex.test("A"));
        assert.ok(regex.test("        Z"));
        assert.ok(regex.test("text with Spaces"));
        assert.notOk(regex.test(" "));
        assert.ok(regex.test("1"));
        assert.notOk(regex.test("%"));
        assert.ok(regex.test("_"));
        assert.ok(regex.test("s"));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestNonWordCharacter", function(assert)
    {
        var regex = new RegexBuilder()
            .nonWordCharacter()
            .buildRegex();

        assert.equal(regex.toString(), "/\\W/");
        assert.notOk(regex.test("A"));
        assert.ok(regex.test("        Z"));
        assert.ok(regex.test("text with Spaces"));
        assert.ok(regex.test(" "));
        assert.notOk(regex.test("1"));
        assert.ok(regex.test("%"));
        assert.notOk(regex.test("_"));
        assert.notOk(regex.test("s"));
        assert.notOk(regex.test(""));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.ok(regex.test(Strings.WhiteSpace));
        assert.ok(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestAnyCharacterFrom", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacterFrom("cat")
            .buildRegex();

        assert.equal(regex.toString(), "/[cat]/");
        assert.ok(regex.test("cat"));
        assert.ok(regex.test("parrot"));
        assert.ok(regex.test("tiger"));
        assert.ok(regex.test("cow"));
        assert.notOk(regex.test("CAT"));
        assert.notOk(regex.test("dog"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestAnyCharacterFromWithCaretAtStart", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacterFrom("^abc")
            .buildRegex();

        assert.equal(regex.toString(), "/[\\^abc]/");
        assert.ok(regex.test("jazz"));
        assert.ok(regex.test("_^_"));
        assert.ok(regex.test("oboe"));
        assert.ok(regex.test("cue"));
        assert.notOk(regex.test("CAT"));
        assert.notOk(regex.test("dog"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestAnyCharacterFromWithCaretNotAtStart", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacterFrom("a^bc")
            .buildRegex();

        assert.equal(regex.toString(), "/[a^bc]/");
        assert.ok(regex.test("jazz"));
        assert.ok(regex.test("_^_"));
        assert.ok(regex.test("oboe"));
        assert.ok(regex.test("cue"));
        assert.notOk(regex.test("CAT"));
        assert.notOk(regex.test("dog"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestAnyCharacterExcept", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacterExcept("cat")
            .buildRegex();

        assert.equal(regex.toString(), "/[^cat]/");
        assert.notOk(regex.test("cat"));
        assert.notOk(regex.test("tata"));
        assert.ok(regex.test("parrot"));
        assert.ok(regex.test("tiger"));
        assert.ok(regex.test("cow"));
        assert.ok(regex.test("CAT"));
        assert.ok(regex.test("dog"));
        assert.ok(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.ok(regex.test(Strings.WhiteSpace));
        assert.ok(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestAnyOf", function(assert)
    {
        var regex = new RegexBuilder()
            .anyOf(["cat", "dog", "|"])
            .buildRegex();

        assert.equal(regex.toString(), "/(?:cat|dog|\\|)/");
        assert.notOk(regex.test("ca do"));
        assert.ok(regex.test("cat"));
        assert.ok(regex.test("dog"));
        assert.ok(regex.test("|"));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    // QUnit.test("TestAnyOfNullEmptyOrSingle", function(assert)
    // {
    //     var anyOfNullRegex = new RegexBuilder()
    //         .anyOf(null)
    //         .buildRegex();
    //
    //     var anyOfUndefinedRegex = new RegexBuilder()
    //         .anyOf(undefined)
    //         .buildRegex();
    //
    //     var anyOfEmptyRegex = new RegexBuilder()
    //         .anyOf([])
    //         .buildRegex();
    //
    //     var anyOfStringRegex = new RegexBuilder()
    //         .anyOf("cat")
    //         .buildRegex();
    //
    //     var anyOfSingleRegex = new RegexBuilder()
    //         .anyOf(["cat"])
    //         .buildRegex();
    //
    //     assert.equal(anyOfNullRegex.toString(), "//");
    //     assert.equal(anyOfUndefinedRegex.toString(), "//");
    //     assert.equal(anyOfEmptyRegex.toString(), "//");
    //     assert.equal(anyOfStringRegex.toString(), "/cat/");
    //     assert.equal(anyOfSingleRegex.toString(), "/cat/");
    // });

    QUnit.test("TestStartOfString", function(assert)
    {
        var regex = new RegexBuilder()
            .startOfString()
            .text("a")
            .buildRegex();

        assert.equal(regex.toString(), "/^a/");
        assert.ok(regex.test("a"));
        assert.ok(regex.test("aA"));
        assert.ok(regex.test("a_"));
        assert.ok(regex.test("a        big gap"));
        assert.notOk(regex.test(" a space before"));
        assert.notOk(regex.test("A capital letter"));
        assert.notOk(regex.test("Aa"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestEndOfString", function(assert)
    {
        var regex = new RegexBuilder()
            .text("z")
            .endOfString()
            .buildRegex();

        assert.equal(regex.toString(), "/z$/");
        assert.ok(regex.test("z"));
        assert.ok(regex.test("zzz"));
        assert.ok(regex.test("fizz buzz"));
        assert.notOk(regex.test("buzz!"));
        assert.notOk(regex.test("zzz "));
        assert.notOk(regex.test("zZ"));
        assert.notOk(regex.test("z "));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestWordBoundary", function(assert)
    {
        var regex = new RegexBuilder()
            .text("a")
            .wordBoundary()
            .buildRegex();

        assert.equal(regex.toString(), "/a\\b/");
        assert.ok(regex.test("a"));
        assert.ok(regex.test("spa"));
        assert.ok(regex.test("papa don't preach"));
        assert.ok(regex.test("a dog"));
        assert.ok(regex.test("a-dog"));
        assert.notOk(regex.test("an apple"));
        assert.notOk(regex.test("asp"));
        assert.notOk(regex.test("a1b"));
        assert.notOk(regex.test("a_b"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
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

        var match = regex.exec("Class A1");
        assert.notEqual(match, null);
        assert.equal(match[0], "Class A1");
        assert.equal(match[1], "A1");

        match = regex.exec("he likes F1 racing");
        assert.notEqual(match, null);
        assert.equal(match[0], "he likes F1");
        assert.equal(match[1], "F1");

        match = regex.exec("A4 paper");
        assert.notEqual(match, null);
        assert.equal(match[0], "A4");
        assert.equal(match[1], "A4");

        match = regex.exec("A 4-legged dog");
        assert.equal(match, null);

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    // QUnit.test("TestRepeatGroup", function(assert)
    // {
    //     var regex = new RegexBuilder()
    //         .startGroup()
    //         .letter()
    //         .digit()
    //         .endGroup()
    //         .buildRegex();
    //
    //     assert.equal(regex.toString(), "/([a-zA-Z]\d)/");
    //
    //     MatchCollection matches = regex.execes("Class A1 f2 ZZ88");
    //     assert.equal(3, matches.Count);
    //     assert.equal(matches[0].Value, "A1");
    //     assert.equal(matches[1].Value, "f2");
    //     assert.equal(matches[2].Value, "Z8");
    //
    //     assert.notOk(regex.test(Strings.BothCaseAlphabet));
    //     assert.notOk(regex.test(Strings.UpperCaseAlphabet));
    //     assert.notOk(regex.test(Strings.LowerCaseAlphabet));
    //     assert.notOk(regex.test(Strings.DecimalDigits));
    //     assert.notOk(regex.test(Strings.BothCaseHexDigits));
    //     assert.notOk(regex.test(Strings.UpperCaseHexDigits));
    //     assert.notOk(regex.test(Strings.LowerCaseHexDigits));
    //     assert.notOk(regex.test(Strings.Symbols));
    //     assert.notOk(regex.test(Strings.WhiteSpace));
    //     assert.notOk(regex.test(Strings.ControlCharacters));
    //     assert.notOk(regex.test(Strings.Empty));
    //     assert.notOk(regex.test(Strings.SimpleName));
    //     assert.notOk(regex.test(Strings.SimpleEmailAddress));
    //     assert.notOk(regex.test(Strings.SimpleHttpUrl));
    //     assert.notOk(regex.test(Strings.SimpleHttpsUrl));
    //     assert.notOk(regex.test(Strings.Ipv4Address));
    //     assert.ok(regex.test(Strings.Ipv6Address));
    //     assert.ok(regex.test(Strings.MacAddress));
    // });
    //
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

        var match = regex.exec("a99z");
        assert.notEqual(match, null);
        assert.equal(match[0], "a99z");
        assert.equal(match[1], undefined);

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
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

        var match = regex.exec("Class A1");
        assert.notEqual(match, null);
        assert.equal(match[0], "Class A1");
        assert.equal(match[1], "Class ");
        assert.equal(match[2], "A1");

        match = regex.exec("he likes F1 racing");
        assert.notEqual(match, null);
        assert.equal(match[0], "he likes F1");
        assert.equal(match[1], "he likes ");
        assert.equal(match[2], "F1");

        match = regex.exec("A4 paper");
        assert.notEqual(match, null);
        assert.equal(match[0], "A4");
        assert.equal(match[1], "");
        assert.equal(match[2], "A4");

        match = regex.exec("A 4-legged dog");
        assert.equal(match, null);

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
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

        var match = regex.exec("Class A1");
        assert.notEqual(match, null);
        assert.equal(match[0], "Class A1");
        assert.equal(match[1], "lass A1");
        assert.equal(match[2], "A1");

        match = regex.exec("he likes F1 racing");
        assert.notEqual(match, null);
        assert.equal(match[0], "he likes F1");
        assert.equal(match[1], "e likes F1");
        assert.equal(match[2], "F1");

        match = regex.exec(" A4 paper");
        assert.notEqual(match, null);
        assert.equal(match[0], " A4");
        assert.equal(match[1], "A4");
        assert.equal(match[2], "A4");

        match = regex.exec("A 4-legged dog");
        assert.equal(match, null);

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestZeroOrMore", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.zeroOrMore)
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d*[a-zA-Z]/");
        assert.ok(regex.test("ab"));
        assert.ok(regex.test("a1b"));
        assert.ok(regex.test("a123b"));
        assert.notOk(regex.test("a 1 b"));
        assert.notOk(regex.test("a b"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestOneOrMore", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.oneOrMore)
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d+[a-zA-Z]/");
        assert.notOk(regex.test("ab"));
        assert.ok(regex.test("a1b"));
        assert.ok(regex.test("a123b"));
        assert.notOk(regex.test("a 1 b"));
        assert.notOk(regex.test("a b"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestOneOrNone", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.noneOrOne)
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d?[a-zA-Z]/");
        assert.ok(regex.test("ab"));
        assert.ok(regex.test("a1b"));
        assert.notOk(regex.test("a123b"));
        assert.notOk(regex.test("a 1 b"));
        assert.notOk(regex.test("a b"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestExactlyNTimes", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.exactly(3))
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d{3}[a-zA-Z]/");
        assert.notOk(regex.test("ab"));
        assert.notOk(regex.test("a1b"));
        assert.notOk(regex.test("a12b"));
        assert.ok(regex.test("a123b"));
        assert.notOk(regex.test("a1234b"));
        assert.notOk(regex.test("a12345b"));
        assert.notOk(regex.test("a 1 b"));
        assert.notOk(regex.test("a b"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestAtLeastQuantifier", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.atLeast(3))
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d{3,}[a-zA-Z]/");
        assert.notOk(regex.test("ab"));
        assert.notOk(regex.test("a1b"));
        assert.notOk(regex.test("a12b"));
        assert.ok(regex.test("a123b"));
        assert.ok(regex.test("a1234b"));
        assert.ok(regex.test("a12345b"));
        assert.notOk(regex.test("a 1 b"));
        assert.notOk(regex.test("a b"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestNoMoreThanQuantifier", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.noMoreThan(3))
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d{0,3}[a-zA-Z]/");
        assert.ok(regex.test("ab"));
        assert.ok(regex.test("a1b"));
        assert.ok(regex.test("a12b"));
        assert.ok(regex.test("a123b"));
        assert.notOk(regex.test("a1234b"));
        assert.notOk(regex.test("a12345b"));
        assert.notOk(regex.test("a 1 b"));
        assert.notOk(regex.test("a b"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestBetweenMinMaxTimes", function(assert)
    {
        var regex = new RegexBuilder()
            .letter()
            .digit(RegexQuantifier.between(2, 4))
            .letter()
            .buildRegex();

        assert.equal(regex.toString(), "/[a-zA-Z]\\d{2,4}[a-zA-Z]/");
        assert.notOk(regex.test("ab"));
        assert.notOk(regex.test("a1b"));
        assert.ok(regex.test("a12b"));
        assert.ok(regex.test("a123b"));
        assert.ok(regex.test("a1234b"));
        assert.notOk(regex.test("a12345b"));
        assert.notOk(regex.test("a 1 b"));
        assert.notOk(regex.test("a b"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestOptionMultiLine", function(assert)
    {
        var regex = new RegexBuilder()
            .startOfString()
            .text("find me!")
            .endOfString()
            .buildRegex(RegexOptions.MULTI_LINE);

        assert.equal(regex.toString(), "/^find me!$/m");
        assert.notOk(regex.global);
        assert.notOk(regex.ignoreCase);
        assert.ok(regex.multiline);
        assert.ok(regex.test("find me!"));
        assert.ok(regex.test("find me!\nline 2"));
        assert.ok(regex.test("line 1\nfind me!"));
        assert.ok(regex.test("line 1\nfind me!\nline 3"));
        assert.notOk(regex.test(" find me!"));
        assert.notOk(regex.test("find me! "));
        assert.notOk(regex.test(" find me! "));
        assert.notOk(regex.test(""));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestOptionIgnoreCase", function(assert)
    {
        var regex = new RegexBuilder()
            .anyCharacterFrom("cat")
            .buildRegex(RegexOptions.IGNORE_CASE);

        assert.equal(regex.toString(), "/[cat]/i");
        assert.notOk(regex.global);
        assert.ok(regex.ignoreCase);
        assert.notOk(regex.multiline);
        assert.ok(regex.test("cat"));
        assert.ok(regex.test("tiger"));
        assert.ok(regex.test("Ant"));
        assert.ok(regex.test("CAT"));
        assert.ok(regex.test("                A"));
        assert.notOk(regex.test("dog"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestOptionMatchAll", function(assert)
    {
        var regex = new RegexBuilder()
            .text("cat")
            .buildRegex(RegexOptions.MATCH_ALL);

        var replaced = "catcatcat".replace(regex, "dog");

        assert.equal(regex.toString(), "/cat/g");
        assert.ok(regex.global);
        assert.notOk(regex.ignoreCase);
        assert.notOk(regex.multiline);
        assert.equal(replaced, "dogdogdog");
        assert.ok(regex.test("cat"));
        assert.notOk(regex.test("CAT"));
        assert.notOk(regex.test("dog"));
        assert.notOk(regex.test(" "));
        assert.notOk(regex.test(""));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestAllOptions", function(assert)
    {
        var regex = new RegexBuilder()
            .startOfString()
            .anyCharacterFrom("cat")
            .buildRegex([RegexOptions.IGNORE_CASE, RegexOptions.MULTI_LINE, RegexOptions.MATCH_ALL]);

        assert.equal(regex.toString(), "/^[cat]/gim");
        assert.ok(regex.global);
        assert.ok(regex.ignoreCase);
        assert.ok(regex.multiline);
        assert.ok(regex.test("cat"));
        // assert.ok(regex.test("tiger"));
        // assert.ok(regex.test("Ant"));
        // assert.ok(regex.test("CAT"));
        // assert.ok(regex.test("DOG\ncat"));
        // assert.notOk(regex.test("                A"));
        // assert.notOk(regex.test("dog"));
        // assert.notOk(regex.test(" "));
        // assert.notOk(regex.test(""));
        //
        // assert.ok(regex.test(Strings.BothCaseAlphabet));
        // assert.ok(regex.test(Strings.UpperCaseAlphabet));
        // assert.ok(regex.test(Strings.LowerCaseAlphabet));
        // assert.notOk(regex.test(Strings.DecimalDigits));
        // assert.ok(regex.test(Strings.BothCaseHexDigits));
        // assert.ok(regex.test(Strings.UpperCaseHexDigits));
        // assert.ok(regex.test(Strings.LowerCaseHexDigits));
        // assert.notOk(regex.test(Strings.Symbols));
        // assert.notOk(regex.test(Strings.WhiteSpace));
        // assert.notOk(regex.test(Strings.ControlCharacters));
        // assert.notOk(regex.test(Strings.Empty));
        // assert.ok(regex.test(Strings.SimpleName));
        // assert.ok(regex.test(Strings.SimpleEmailAddress));
        // assert.ok(regex.test(Strings.SimpleHttpUrl));
        // assert.ok(regex.test(Strings.SimpleHttpsUrl));
        // assert.notOk(regex.test(Strings.Ipv4Address));
        // assert.ok(regex.test(Strings.Ipv6Address));
        // assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestEmailAddress", function(assert)
    {
        // Very basic e-mail address checker!
        var regex = new RegexBuilder()
            .startOfString()
            .nonWhitespace(RegexQuantifier.atLeast(2))
            .text("@")
            .nonWhitespace(RegexQuantifier.atLeast(2))
            .text(".")
            .nonWhitespace(RegexQuantifier.atLeast(2))
            .endOfString()
            .buildRegex();

        assert.equal(regex.toString(), "/^\\S{2,}@\\S{2,}\\.\\S{2,}$/");
        assert.ok(regex.test("mark.whitaker@mainwave.co.uk"));
        assert.ok(regex.test("aa@bb.cc"));
        assert.ok(regex.test("__@__.__"));
        assert.ok(regex.test("..@....."));
        assert.notOk(regex.test("aa@bb.c"));
        assert.notOk(regex.test("aa@b.cc"));
        assert.notOk(regex.test("a@bb.cc"));
        assert.notOk(regex.test("a@b.c"));
        assert.notOk(regex.test("  @  .  "));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestUrl", function(assert)
    {
        // Very basic URL checker!
        var regex = new RegexBuilder()
            .text("http")
            .text("s", RegexQuantifier.noneOrOne)
            .text("://")
            .nonWhitespace(RegexQuantifier.oneOrMore)
            .anyCharacterFrom("a-zA-Z0-9_/") // Valid last characters
            .buildRegex();

        assert.equal(regex.toString(), "/http(?:s)?:\\/\\/\\S+[a-zA-Z0-9_\\/]/");
        assert.ok(regex.test("http://www.mainwave.co.uk"));
        assert.ok(regex.test("https://www.mainwave.co.uk"));
        assert.notOk(regex.test("www.mainwave.co.uk"));
        assert.notOk(regex.test("ftp://www.mainwave.co.uk"));

        var match = regex.exec("Go to http://www.mainwave.co.uk. Then click the link.");
        assert.notEqual(match, null);
        assert.equal(match[0], "http://www.mainwave.co.uk");

        match = regex.exec("Go to https://www.mainwave.co.uk/test/, then click the link.");
        assert.notEqual(match, null);
        assert.equal(match[0], "https://www.mainwave.co.uk/test/");

        match = regex.exec("Go to 'http://www.mainwave.co.uk' then click the link.");
        assert.notEqual(match, null);
        assert.equal(match[0], "http://www.mainwave.co.uk");

        match = regex.exec("Go to \"http://www.mainwave.co.uk\" then click the link.");
        assert.notEqual(match, null);
        assert.equal(match[0], "http://www.mainwave.co.uk");

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.notOk(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestIp4Address", function(assert)
    {
        // Very basic IPv4 address checker!
        // (doesn't check values are in range, for example)
        var regex = new RegexBuilder()
            .startOfString()
            .startGroup()
                .digit(RegexQuantifier.between(1, 3))
                .text(".")
            .endGroup(RegexQuantifier.exactly(3))
            .digit(RegexQuantifier.between(1, 3))
            .endOfString()
            .buildRegex();

        assert.equal(regex.toString(), "/^(\\d{1,3}\\.){3}\\d{1,3}$/");
        assert.ok(regex.test("10.1.1.100"));
        assert.ok(regex.test("1.1.1.1"));
        assert.ok(regex.test("0.0.0.0"));
        assert.ok(regex.test("255.255.255.255"));
        assert.ok(regex.test("999.999.999.999"));
        assert.notOk(regex.test("1.1.1."));
        assert.notOk(regex.test("1.1.1."));
        assert.notOk(regex.test("1.1.1.1."));
        assert.notOk(regex.test("1.1.1.1.1"));
        assert.notOk(regex.test("1.1.1.1000"));

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.notOk(regex.test(Strings.DecimalDigits));
        assert.notOk(regex.test(Strings.BothCaseHexDigits));
        assert.notOk(regex.test(Strings.UpperCaseHexDigits));
        assert.notOk(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.notOk(regex.test(Strings.Ipv6Address));
        assert.notOk(regex.test(Strings.MacAddress));
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
        var nonGreedyMatch = regex.exec("999");
        assert.notEqual(nonGreedyMatch, null);
        assert.equal(nonGreedyMatch[0], "");

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.ok(regex.test(Strings.WhiteSpace));
        assert.ok(regex.test(Strings.ControlCharacters));
        assert.ok(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestOneOrMoreButAsFewAsPossible", function(assert)
    {
        var regex = new RegexBuilder()
            .digit(RegexQuantifier.oneOrMore.butAsFewAsPossible())
            .buildRegex();

        assert.equal(regex.toString(), "/\\d+?/");
        var nonGreedyMatch = regex.exec("999");
        assert.notEqual(nonGreedyMatch, null);
        assert.equal(nonGreedyMatch[0], "9");

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestAtLeastButAsFewAsPossible", function(assert)
    {
        var regex = new RegexBuilder()
            .digit(RegexQuantifier.atLeast(1).butAsFewAsPossible())
            .buildRegex();

        assert.equal(regex.toString(), "/\\d{1,}?/");
        var nonGreedyMatch = regex.exec("999");
        assert.notEqual(nonGreedyMatch, null);
        assert.equal(nonGreedyMatch[0], "9");

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestBetweenButAsFewAsPossible", function(assert)
    {
        var regex = new RegexBuilder()
            .digit(RegexQuantifier.between(2, 100).butAsFewAsPossible())
            .buildRegex();

        assert.equal(regex.toString(), "/\\d{2,100}?/");
        var nonGreedyMatch = regex.exec("999");
        assert.notEqual(nonGreedyMatch, null);
        assert.equal(nonGreedyMatch[0], "99");

        assert.notOk(regex.test(Strings.BothCaseAlphabet));
        assert.notOk(regex.test(Strings.UpperCaseAlphabet));
        assert.notOk(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.notOk(regex.test(Strings.Symbols));
        assert.notOk(regex.test(Strings.WhiteSpace));
        assert.notOk(regex.test(Strings.ControlCharacters));
        assert.notOk(regex.test(Strings.Empty));
        assert.notOk(regex.test(Strings.SimpleName));
        assert.notOk(regex.test(Strings.SimpleEmailAddress));
        assert.notOk(regex.test(Strings.SimpleHttpUrl));
        assert.notOk(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestNoMoreThanButAsFewAsPossible", function(assert)
    {
        var regex = new RegexBuilder()
            .digit(RegexQuantifier.noMoreThan(2).butAsFewAsPossible())
            .buildRegex();

        assert.equal(regex.toString(), "/\\d{0,2}?/");
        var nonGreedyMatch = regex.exec("999");
        assert.notEqual(nonGreedyMatch, null);
        assert.equal(nonGreedyMatch[0], "");

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.ok(regex.test(Strings.WhiteSpace));
        assert.ok(regex.test(Strings.ControlCharacters));
        assert.ok(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
    });

    QUnit.test("TestNoneOrOneButAsFewAsPossible", function(assert)
    {
        var regex = new RegexBuilder()
            .digit(RegexQuantifier.noneOrOne.butAsFewAsPossible())
            .buildRegex();

        assert.equal(regex.toString(), "/\\d??/");
        var nonGreedyMatch = regex.exec("999");
        assert.notEqual(nonGreedyMatch, null);
        assert.equal(nonGreedyMatch[0], "");

        assert.ok(regex.test(Strings.BothCaseAlphabet));
        assert.ok(regex.test(Strings.UpperCaseAlphabet));
        assert.ok(regex.test(Strings.LowerCaseAlphabet));
        assert.ok(regex.test(Strings.DecimalDigits));
        assert.ok(regex.test(Strings.BothCaseHexDigits));
        assert.ok(regex.test(Strings.UpperCaseHexDigits));
        assert.ok(regex.test(Strings.LowerCaseHexDigits));
        assert.ok(regex.test(Strings.Symbols));
        assert.ok(regex.test(Strings.WhiteSpace));
        assert.ok(regex.test(Strings.ControlCharacters));
        assert.ok(regex.test(Strings.Empty));
        assert.ok(regex.test(Strings.SimpleName));
        assert.ok(regex.test(Strings.SimpleEmailAddress));
        assert.ok(regex.test(Strings.SimpleHttpUrl));
        assert.ok(regex.test(Strings.SimpleHttpsUrl));
        assert.ok(regex.test(Strings.Ipv4Address));
        assert.ok(regex.test(Strings.Ipv6Address));
        assert.ok(regex.test(Strings.MacAddress));
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
                new RegexQuantifier(1);
            },
            new Error("Invalid regexString")
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
