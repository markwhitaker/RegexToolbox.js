import { describe, test, expect } from "bun:test";
import {RegexOptions, RegexQuantifier, RegexBuilder} from "../index.js";

describe("RegexBuilder", () => {
    test("Test text()", () => {
        const regex = new RegexBuilder()
            .text("a*b")
            .buildRegex();

        expect(regex.toString()).toBe("/a\\*b/");
    });

    test("Test text() with quantifier", () => {
        const regex = new RegexBuilder()
            .text("a*b", RegexQuantifier.oneOrMore)
            .buildRegex();

        expect(regex.toString()).toBe("/(?:a\\*b)+/");
    });

    test("Test text() with regex characters", () => {
        const regex = new RegexBuilder()
            .text("\\.+*?[]{}()|^$")
            .buildRegex();

        expect(regex.toString()).toBe("/\\\\\\.\\+\\*\\?\\[\\]\\{\\}\\(\\)\\|\\^\\$/");
    });

    test("Test regexText()", () => {
        const regex = new RegexBuilder()
            .regexText("^\\scat\\b")
            .buildRegex();

        expect(regex.toString()).toBe("/^\\scat\\b/");
    });

    test("Test anyCharacter()", () => {
        const regex = new RegexBuilder()
            .anyCharacter()
            .buildRegex();

        expect(regex.toString()).toBe("/./");
    });

    test("Test whitespace()", () => {
        const regex = new RegexBuilder()
            .whitespace()
            .buildRegex();

        expect(regex.toString()).toBe("/\\s/");
    });

    test("Test nonWhitespace()", () => {
        const regex = new RegexBuilder()
            .nonWhitespace()
            .buildRegex();

        expect(regex.toString()).toBe("/\\S/");
    });

    test("Test possibleWhitespace()", () => {
        const regex = new RegexBuilder()
            .possibleWhitespace()
            .buildRegex();

        expect(regex.toString()).toBe("/\\s*/");
    });

    test("Test space()", () => {
        const regex = new RegexBuilder()
            .space()
            .buildRegex();

        expect(regex.toString()).toBe("/ /");
    });

    test("Test tab()", () => {
        const regex = new RegexBuilder()
            .tab()
            .buildRegex();

        expect(regex.toString()).toBe("/\\t/");
    });

    test("Test carriageReturn()", () => {
        const regex = new RegexBuilder()
            .carriageReturn()
            .buildRegex();

        expect(regex.toString()).toBe("/\\r/");
    });

    test("Test lineFeed()", () => {
        const regex = new RegexBuilder()
            .lineFeed()
            .buildRegex();

        expect(regex.toString()).toBe("/\\n/");
    });

    test("Test digit()", () => {
        const regex = new RegexBuilder()
            .digit()
            .buildRegex();

        expect(regex.toString()).toBe("/\\d/");
    });

    test("Test nonDigit()", () => {
        const regex = new RegexBuilder()
            .nonDigit()
            .buildRegex();

        expect(regex.toString()).toBe("/\\D/");
    });

    test("Test letter()", () => {
        const regex = new RegexBuilder()
            .letter()
            .buildRegex();

        expect(regex.toString()).toBe("/\\p{L}/u");
        expect(regex.test("a")).toBe(true);
        expect(regex.test("ß")).toBe(true);
        expect(regex.test("現")).toBe(true);
        expect(regex.test("")).toBe(false);
        expect(regex.test("1")).toBe(false);
        expect(regex.test("!")).toBe(false);
    });

    test("Test nonLetter()", () => {
        const regex = new RegexBuilder()
            .nonLetter()
            .buildRegex();

        expect(regex.toString()).toBe("/\\P{L}/u");
        expect(regex.test("a")).toBe(false);
        expect(regex.test("ß")).toBe(false);
        expect(regex.test("現")).toBe(false);
        expect(regex.test("")).toBe(false);
        expect(regex.test("1")).toBe(true);
        expect(regex.test("!")).toBe(true);
    });

    test("Test uppercaseLetter()", () => {
        const regex = new RegexBuilder()
            .uppercaseLetter()
            .buildRegex();

        expect(regex.toString()).toBe("/\\p{Lu}/u");
        expect(regex.test("A")).toBe(true);
        expect(regex.test("a")).toBe(false);
        expect(regex.test("ẞ")).toBe(true);
        expect(regex.test("ß")).toBe(false);
        expect(regex.test("現")).toBe(false);
        expect(regex.test("")).toBe(false);
        expect(regex.test("1")).toBe(false);
        expect(regex.test("!")).toBe(false);
    });

    test("Test lowercaseLetter()", () => {
        const regex = new RegexBuilder()
            .lowercaseLetter()
            .buildRegex();

        expect(regex.toString()).toBe("/\\p{Ll}/u");
        expect(regex.test("A")).toBe(false);
        expect(regex.test("a")).toBe(true);
        expect(regex.test("ẞ")).toBe(false);
        expect(regex.test("ß")).toBe(true);
        expect(regex.test("現")).toBe(false);
        expect(regex.test("")).toBe(false);
        expect(regex.test("1")).toBe(false);
        expect(regex.test("!")).toBe(false);
    });

    test("Test letterOrDigit()", () => {
        const regex = new RegexBuilder()
            .letterOrDigit()
            .buildRegex();

        expect(regex.toString()).toBe("/[\\p{L}0-9]/u");
        expect(regex.test("A")).toBe(true);
        expect(regex.test("a")).toBe(true);
        expect(regex.test("ẞ")).toBe(true);
        expect(regex.test("ß")).toBe(true);
        expect(regex.test("現")).toBe(true);
        expect(regex.test("")).toBe(false);
        expect(regex.test("1")).toBe(true);
        expect(regex.test("!")).toBe(false);
    });

    test("Test nonLetterOrDigit()", () => {
        const regex = new RegexBuilder()
            .nonLetterOrDigit()
            .buildRegex();

        expect(regex.toString()).toBe("/[^\\p{L}0-9]/u");
        expect(regex.test("A")).toBe(false);
        expect(regex.test("a")).toBe(false);
        expect(regex.test("ẞ")).toBe(false);
        expect(regex.test("ß")).toBe(false);
        expect(regex.test("現")).toBe(false);
        expect(regex.test("")).toBe(false);
        expect(regex.test("1")).toBe(false);
        expect(regex.test("!")).toBe(true);
    });

    test("Test hexDigit()", () => {
        const regex = new RegexBuilder()
            .hexDigit()
            .buildRegex();

        expect(regex.toString()).toBe("/[0-9A-Fa-f]/");
    });

    test("Test uppercaseHexDigit()", () => {
        const regex = new RegexBuilder()
            .uppercaseHexDigit()
            .buildRegex();

        expect(regex.toString()).toBe("/[0-9A-F]/");
    });

    test("Test lowercaseHexDigit()", () => {
        const regex = new RegexBuilder()
            .lowercaseHexDigit()
            .buildRegex();

        expect(regex.toString()).toBe("/[0-9a-f]/");
    });

    test("Test nonHexDigit()", () => {
        const regex = new RegexBuilder()
            .nonHexDigit()
            .buildRegex();

        expect(regex.toString()).toBe("/[^0-9A-Fa-f]/");
    });

    test("Test wordCharacter()", () => {
        const regex = new RegexBuilder()
            .wordCharacter()
            .buildRegex();

        expect(regex.toString()).toBe("/[\\p{L}0-9_]/u");
        expect(regex.test("a")).toBe(true);
        expect(regex.test("ẞ")).toBe(true);
        expect(regex.test("現")).toBe(true);
        expect(regex.test("_")).toBe(true);
        expect(regex.test("1")).toBe(true);
        expect(regex.test("")).toBe(false);
        expect(regex.test("!")).toBe(false);
    });

    test("Test nonWordCharacter()", () => {
        const regex = new RegexBuilder()
            .nonWordCharacter()
            .buildRegex();

        expect(regex.toString()).toBe("/[^\\p{L}0-9_]/u");
        expect(regex.test("a")).toBe(false);
        expect(regex.test("ẞ")).toBe(false);
        expect(regex.test("現")).toBe(false);
        expect(regex.test("_")).toBe(false);
        expect(regex.test("1")).toBe(false);
        expect(regex.test("")).toBe(false);
        expect(regex.test("!")).toBe(true);
    });

    test("Test anyCharacterFrom()", () => {
        const regex = new RegexBuilder()
            .anyCharacterFrom("cat")
            .buildRegex();

        expect(regex.toString()).toBe("/[cat]/");
    });

    test("Test anyCharacterFrom() with caret at start", () => {
        const regex = new RegexBuilder()
            .anyCharacterFrom("^abc")
            .buildRegex();

        expect(regex.toString()).toBe("/[\\^abc]/");
    });

    test("Test anyCharacterFrom() with hyphen", () => {
        const regex = new RegexBuilder()
            .anyCharacterFrom("a-f")
            .buildRegex();

        expect(regex.toString()).toBe("/[a\\-f]/");
    });

    test("Test anyCharacterFrom() with caret not at start", () => {
        const regex = new RegexBuilder()
            .anyCharacterFrom("a^bc")
            .buildRegex();

        expect(regex.toString()).toBe("/[a^bc]/");
    });

    test("Test anyCharacterExcept()", () => {
        const regex = new RegexBuilder()
            .anyCharacterExcept("cat")
            .buildRegex();

        expect(regex.toString()).toBe("/[^cat]/");
    });

    test("Test anyOf()", () => {
        const regex = new RegexBuilder()
            .anyOf(["cat", "dog", "|"])
            .buildRegex();

        expect(regex.toString()).toBe("/(?:cat|dog|\\|)/");
    });

    test("Test startOfString()", () => {
        const regex = new RegexBuilder()
            .startOfString()
            .text("a")
            .buildRegex();

        expect(regex.toString()).toBe("/^a/");
    });

    test("Test endOfString()", () => {
        const regex = new RegexBuilder()
            .text("z")
            .endOfString()
            .buildRegex();

        expect(regex.toString()).toBe("/z$/");
    });

    test("Test wordBoundary()", () => {
        const regex = new RegexBuilder()
            .text("a")
            .wordBoundary()
            .buildRegex();

        expect(regex.toString()).toBe("/a\\b/");
    });

    test("Test single group", () => {
        const regex = new RegexBuilder()
            .anyCharacter()
            .group(regex => regex
                .anyCharacter()
                .whitespace()
            )
            .anyCharacter()
            .buildRegex();

        expect(regex.toString()).toBe("/.(.\\s)./");
    });

    test("Test single group with quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter()
            .group(regex => regex
                .anyCharacter()
                .whitespace(),
                RegexQuantifier.oneOrMore
            )
            .anyCharacter()
            .buildRegex();

        expect(regex.toString()).toBe("/.(.\\s)+./");
    });

    test("Test non-capturing group", () => {
        const regex = new RegexBuilder()
            .anyCharacter()
            .nonCapturingGroup(regex => regex
                .anyCharacter()
                .whitespace()
            )
            .anyCharacter()
            .buildRegex();

        expect(regex.toString()).toBe("/.(?:.\\s)./");
    });

    test("Test non-capturing group with quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter()
            .nonCapturingGroup(regex => regex
                .anyCharacter()
                .whitespace(),
                RegexQuantifier.oneOrMore
            )
            .anyCharacter()
            .buildRegex();

        expect(regex.toString()).toBe("/.(?:.\\s)+./");
    });

    test("Test named group", () => {
        const regex = new RegexBuilder()
            .anyCharacter()
            .namedGroup("test", regex => regex
                .anyCharacter()
                .whitespace()
            )
            .anyCharacter()
            .buildRegex();

        expect(regex.toString()).toBe("/.(?<test>.\\s)./");
    });

    test("Test named group with quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter()
            .namedGroup("test", regex => regex
                .anyCharacter()
                .whitespace(),
                RegexQuantifier.oneOrMore
            )
            .anyCharacter()
            .buildRegex();

        expect(regex.toString()).toBe("/.(?<test>.\\s)+./");
    });

    test("Test multiple groups", () => {
        const regex = new RegexBuilder()
            .group(regex => regex
                .anyCharacter(RegexQuantifier.zeroOrMore)
            )
            .group(regex => regex
                .digit()
            )
            .buildRegex();

        expect(regex.toString()).toBe("/(.*)(\\d)/");
    });

    test("Test nested groups", () => {
        const regex = new RegexBuilder()
            .anyCharacter()
            .group(regex1 => regex1
                .anyCharacter(RegexQuantifier.zeroOrMore)
                .group(regex2 => regex2
                    .digit()
                )
            )
            .buildRegex();

        expect(regex.toString()).toBe("/.(.*(\\d))/");
    });

    test("Test zeroOrMore quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.zeroOrMore)
            .buildRegex();

        expect(regex.toString()).toBe("/.*/");
    });

    test("Test oneOrMore quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.oneOrMore)
            .buildRegex();

        expect(regex.toString()).toBe("/.+/");
    });

    test("Test oneOrNone quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.noneOrOne)
            .buildRegex();

        expect(regex.toString()).toBe("/.?/");
    });

    test("Test exactly() quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.exactly(3))
            .buildRegex();

        expect(regex.toString()).toBe("/.{3}/");
    });

    test("Test atLeast() quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.atLeast(3))
            .buildRegex();

        expect(regex.toString()).toBe("/.{3,}/");
    });

    test("Test noMoreThan() quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.noMoreThan(3))
            .buildRegex();

        expect(regex.toString()).toBe("/.{0,3}/");
    });

    test("Test between() quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.between(2, 4))
            .buildRegex();

        expect(regex.toString()).toBe("/.{2,4}/");
    });

    test("Test MULTI_LINE option", () => {
        const regex = new RegexBuilder()
            .startOfString()
            .anyCharacter()
            .endOfString()
            .buildRegex(RegexOptions.MULTI_LINE);

        expect(regex.toString()).toBe("/^.$/m");
    });

    test("Test IGNORE_CASE option", () => {
        const regex = new RegexBuilder()
            .text("cat")
            .buildRegex(RegexOptions.IGNORE_CASE);

        expect(regex.toString()).toBe("/cat/i");
        expect(regex.test("cat")).toBe(true);
        expect(regex.test("CAT")).toBe(true);
    });

    test("Test MATCH_ALL option", () => {
        const regex = new RegexBuilder()
            .text("cat")
            .buildRegex(RegexOptions.MATCH_ALL);

        const replaced = "catcatcat".replace(regex, "dog");

        expect(regex.toString()).toBe("/cat/g");
        expect(replaced).toBe("dogdogdog");
    });

    test("Test all options", () => {
        const regex = new RegexBuilder()
            .letter()
            .buildRegex([RegexOptions.IGNORE_CASE, RegexOptions.MULTI_LINE, RegexOptions.MATCH_ALL]);

        expect(regex.toString()).toBe("/\\p{L}/gimu");
    });

    test("Test invalid option", () => {
        expect(() => {
            new RegexBuilder()
                .buildRegex(1);
        }).toThrow("All options passed to constructor must be of type RegexOptions");

        expect(() => {
            new RegexBuilder()
                .buildRegex("i");
        }).toThrow("All options passed to constructor must be of type RegexOptions");

        expect(() => {
            new RegexBuilder()
                .buildRegex(true);
        }).toThrow("All options passed to constructor must be of type RegexOptions");
    });

    test("Test zeroOrMore.butAsFewAsPossible quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.zeroOrMore.butAsFewAsPossible)
            .buildRegex();

        expect(regex.toString()).toBe("/.*?/");
    });

    test("Test oneOrMore.butAsFewAsPossible quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.oneOrMore.butAsFewAsPossible)
            .buildRegex();

        expect(regex.toString()).toBe("/.+?/");
    });

    test("Test atLeast().butAsFewAsPossible quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.atLeast(1).butAsFewAsPossible)
            .buildRegex();

        expect(regex.toString()).toBe("/.{1,}?/");
    });

    test("Test between().butAsFewAsPossible quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.between(2, 100).butAsFewAsPossible)
            .buildRegex();

        expect(regex.toString()).toBe("/.{2,100}?/");
    });

    test("Test noMoreThan().butAsFewAsPossible quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.noMoreThan(2).butAsFewAsPossible)
            .buildRegex();

        expect(regex.toString()).toBe("/.{0,2}?/");
    });

    test("Test noneOrOne.butAsFewAsPossible quantifier", () => {
        const regex = new RegexBuilder()
            .anyCharacter(RegexQuantifier.noneOrOne.butAsFewAsPossible)
            .buildRegex();

        expect(regex.toString()).toBe("/.??/");
    });

    test("Test exactly().butAsFewAsPossible quantifier error", () => {
        expect(() => {
            new RegexBuilder()
                .anyCharacter(RegexQuantifier.exactly(1).butAsFewAsPossible);
        }).toThrow("butAsFewAsPossible can't be called on this quantifier");
    });

    test("Test butAsFewAsPossible.butAsFewAsPossible error", () => {
        expect(() => {
            new RegexBuilder()
                .anyCharacter(RegexQuantifier.oneOrMore.butAsFewAsPossible.butAsFewAsPossible);
        }).toThrow("butAsFewAsPossible can't be called on this quantifier");
    });

    test("Test text not string error", () => {
        expect(() => {
            new RegexBuilder()
                .text(true);
        }).toThrow("text must be a string");
    });

    test("Test regex text not string error", () => {
        expect(() => {
            new RegexBuilder()
                .regexText(true);
        }).toThrow("text must be a string");
    });
});
