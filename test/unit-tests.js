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
        ControlCharacters: "\a\b",
        Empty: "",
        SimpleName: "Jo Smith",
        SimpleEmailAddress: "regex.toolbox@mainwave.co.uk",
        SimpleHttpUrl: "http://www.website.com/",
        SimpleHttpsUrl: "https://www.website.com/",
        Ipv4Address: "172.15.254.1",
        Ipv6Address: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        MacAddress: "00:3e:e1:c4:5d:df"
    };

    QUnit.test("TestSimpleText", function (assert) {
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

    QUnit.test("TestSimpleTextWithQuantifier", function (assert) {
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

    // QUnit.test("", function (assert) {
    // });
};
