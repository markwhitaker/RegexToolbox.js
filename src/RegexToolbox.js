"use strict";



// ---------- Extensions ----------

/**
 * Return true if the array contains the supplied item
 * @param item  Item to find
 * @returns {boolean}
 */
Array.prototype.has = function(item) {
    return this.indexOf(item) > -1;
};


// ---------- RegexQuantifier ----------

/**
 * Quantifiers that can be applied to regex elements or groups.
 * Don't call this directly: instead use the class properties and methods
 * such as RegexQuantifier.zeroOrMore.
 *
 * @param regexString   A valid regex quantifier string
 * @param greedy        Whether this quantifier is greedy
 * @constructor
 */
var RegexQuantifier = function(regexString, greedy) {
    var validPattern = /(\*|\+|\?|{\d+}|{\d+,}|{\d+,\d+})\??/;

    if (!validPattern.test(regexString)) {
        throw new Error("Invalid regexString");
    }

    var _regexString = regexString;

    this.butAsFewAsPossible = function() {
        if (!greedy) {
            throw new Error("butAsFewAsPossible() can't be called on this quantifier")
        }
        return new RegexQuantifier(_regexString + "?", false);
    };

    this.regexString = function(){
        return _regexString;
    };
};

/**
 * Quantifier to match the preceding element zero or more times
 * @type {RegexQuantifier}
 */
RegexQuantifier.zeroOrMore = new RegexQuantifier("*", true);

/**
 * Quantifier to match the preceding element one or more times
 * @type {RegexQuantifier}
 */
RegexQuantifier.oneOrMore = new RegexQuantifier("+", true);

/**
 * Quantifier to match the preceding element once or not at all
 * @type {RegexQuantifier}
 */
RegexQuantifier.noneOrOne = new RegexQuantifier("?", true);

/**
 * Quantifier to match an exact number of occurrences of the preceding element
 * @param times The exact number of occurrences to match
 * @returns {RegexQuantifier}
 */
RegexQuantifier.exactly = function(times) {
    return new RegexQuantifier("{" + times + "}", false);
};

/**
 * Quantifier to match at least a minimum number of occurrences of the preceding element
 * @param minimum   The minimum number of occurrences to match
 * @returns {RegexQuantifier}
 */
RegexQuantifier.atLeast = function(minimum) {
    return new RegexQuantifier("{" + minimum + ",}", true);
};

/**
 * Quantifier to match no more than a maximum number of occurrences of the preceding element
 * @param maximum   The maximum number of occurrences to match
 * @returns {RegexQuantifier}
 */
RegexQuantifier.noMoreThan = function(maximum) {
    return new RegexQuantifier("{0," + maximum + "}", true);
};

/**
 * Quantifier to match at least a minimum, and no more than a maximum, occurrences of the preceding element
 * @param minimum   The minimum number of occurrences to match
 * @param maximum   The maximum number of occurrences to match
 * @returns {RegexQuantifier}
 */
RegexQuantifier.between = function(minimum, maximum) {
    return new RegexQuantifier("{" + minimum + "," + maximum + "}", true);
};


// ---------- RegexOptions ----------

var RegexOptions = {
    GLOBAL_MATCH: "option-global-match",
    IGNORE_CASE: "option-ignore-case",
    MULTI_LINE: "option-multi-line"
};


// ---------- RegexBuilder ----------

/**
 * Class to build regular expressions in a more human-readable way using a fluent API.
 *
 * To use, chain method calls representing the elements you want to match, and finish
 * with buildRegex() to build the Regex. Example:
 *
 * var regex = new RegexBuilder()
 *                 .text("cat")
 *                 .endOfString()
 *                 .buildRegex();
 * @constructor
 */
var RegexBuilder = function () {
    var _openGroupCount = 0;
    var _regexString = "";



    // PRIVATE METHODS

    var makeSafeForRegex = function (text) {
        return text
            .replace("\\", "\\\\") // Make sure this always comes first!
            .replace("?", "\\?")
            .replace(".", "\\.")
            .replace("+", "\\+")
            .replace("*", "\\*")
            .replace("^", "\\^")
            .replace("$", "\\$")
            .replace("(", "\\(")
            .replace(")", "\\)")
            .replace("[", "\\[")
            .replace("]", "\\]")
            .replace("{", "\\{")
            .replace("}", "\\}")
            .replace("|", "\\|");
    };

    var makeSafeForCharacterClass = function (text) {
        // Replace ] with \]
        var result = text.replace("]", "\\]");

        // replace ^ with \^ if it occurs at the start of the string
        if (result.indexOf("^") === 0) {
            result = "\\" + result;
        }

        return result;
    };

    var addQuantifier = function (quantifier) {
        if (!quantifier) {
            return;
        }
        if (!(quantifier instanceof RegexQuantifier)) {
            throw new Error("quantifier must be a RegexQuantifier");
        }
        _regexString += quantifier.regexString();
    };

    var isString = function(s) {
        return typeof(s) === "string" || s instanceof String;
    };



    // BUILD METHOD

    /**
     * Build and return a Regex object from the current builder state.
     * After calling this the builder is cleared and ready to re-use.
     *
     * @param options   Array of RegexOptions values to apply to the regex
     * @returns {RegExp}
     */
    this.buildRegex = function (options) {
        if (_openGroupCount === 1) {
            throw new Error("One group is still open");
        }
        if (_openGroupCount > 1) {
            throw new Error(_openGroupCount + " groups are still open");
        }

        var flags = "";
        if (options) {
            if (!(options instanceof Array)) {
                options = [options];
            }
            if (options.has(RegexOptions.GLOBAL_MATCH)) {
                flags += "g";
            }
            if (options.has(RegexOptions.IGNORE_CASE)) {
                flags += "i";
            }
            if (options.has(RegexOptions.MULTI_LINE)) {
                flags += "m";
            }
        }

        var regex = new RegExp(_regexString, flags);
        _regexString = "";
        return regex;
    };



    // CHARACTER MATCHES

    /**
     * Add text to the regex. Any regex special characters will be escaped as necessary so there's no need to do that
     * yourself. For example, "Hello (world)" will be converted to "Hello \(world\)" so the brackets are treated as
     * normal, human-readable brackets, not regex grouping brackets.
     * It WILL match the string literal "Hello (world)".
     * It WILL NOT match the string literal "Hello world".
     *
     * @param text  Text to add
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.text = function (text, quantifier) {
        if (text === null || text === undefined || text.length === 0) {
            return this;
        }
        if (!isString(text)) {
            throw new Error("text must be a string");
        }
        return this.regexText(makeSafeForRegex(text), quantifier);
    };

    /**
     * Add literal regex text to the regex. Regex special characters will NOT be escaped. Only call this if you're
     * comfortable with regex syntax. For example, "Hello (world)" will be left as "Hello (world)", meaning that when
     * the regex is built the brackets will be treated as regex grouping brackets rather than normal, human-readable
     * brackets.
     * It WILL match the string literal "Hello world" (and capture the word "world" as a group).
     * It WILL NOT match the string literal "Hello (world)".
     *
     * @param text  Regex text to add
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.regexText = function (text, quantifier) {
        if (text === null || text === undefined || text.length === 0) {
            return this;
        }
        if (!isString(text)) {
            throw new Error("text must be a string");
        }
        if (!quantifier) {
            _regexString += text;
            return this;
        }

        return this
            .startNonCapturingGroup()
            .regexText(text)
            .endGroup(quantifier);
    };

    /**
     * Add an element to match any character.
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.anyCharacter = function (quantifier) {
        _regexString += ".";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any single whitespace character.
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.whitespace = function (quantifier) {
        _regexString += "\\s";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any single non-whitespace character.
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.nonWhitespace = function (quantifier) {
        _regexString += "\\S";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any single decimal digit (0-9).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.digit = function (quantifier) {
        _regexString += "\\d";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any character that is not a decimal digit (0-9).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.nonDigit = function (quantifier) {
        _regexString += "\\D";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any letter in the Roman alphabet (a-z, A-Z).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.letter = function (quantifier) {
        _regexString += "[a-zA-Z]";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any character that is not a letter in the Roman alphabet (a-z, A-Z).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.nonLetter = function (quantifier) {
        _regexString += "[^a-zA-Z]";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any upper-case letter in the Roman alphabet (A-Z).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.uppercaseLetter = function (quantifier) {
        _regexString += "[A-Z]";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any lowercase letter in the Roman alphabet (a-z).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.lowercaseLetter = function (quantifier) {
        _regexString += "[a-z]";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any letter in the Roman alphabet or decimal digit (a-z, A-Z, 0-9).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.letterOrDigit = function (quantifier) {
        _regexString += "[a-zA-Z0-9]";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any character that is not letter in the Roman alphabet or a decimal digit (a-z, A-Z, 0-9).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.nonLetterOrDigit = function (quantifier) {
        _regexString += "[^a-zA-Z0-9]";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any hexadecimal digit (a-f, A-F, 0-9).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.hexDigit = function (quantifier) {
        _regexString += "[0-9A-Fa-f]";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any uppercase hexadecimal digit (A-F, 0-9).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.uppercaseHexDigit = function (quantifier) {
        _regexString += "[0-9A-F]";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any lowercase hexadecimal digit (a-f, 0-9).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.lowercaseHexDigit = function (quantifier) {
        _regexString += "[0-9a-f]";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any character that is not a hexadecimal digit (a-f, A-F, 0-9).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.nonHexDigit = function (quantifier) {
        _regexString += "[^0-9A-Fa-f]";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any Roman alphabet letter, decimal digit, or underscore (a-z, A-Z, 0-9, _).
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.wordCharacter = function (quantifier) {
        _regexString += "\\w";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element to match any character that is not a Roman alphabet letter, decimal digit, or underscore
     * (a-z, A-Z, 0-9, _)
     *
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.nonWordCharacter = function (quantifier) {
        _regexString += "\\W";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element (a character class) to match any of the characters provided.
     *
     * @param characters    String containing all characters to include in the character class
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.anyCharacterFrom = function (characters, quantifier) {
        _regexString += "[" + makeSafeForCharacterClass(characters) + "]";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add an element (a character class) to match any character except those provided.
     *
     * @param characters    String containing all characters to exclude from the character class
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.anyCharacterExcept = function (characters, quantifier) {
        _regexString += "[^" + makeSafeForCharacterClass(characters) + "]";
        addQuantifier(quantifier);
        return this;
    };

    /**
     * Add a group of alternatives, to match any of the strings provided.
     *
     * @param textArray     A number of strings, any one of which will be matched
     * @param quantifier    (Optional) Quantifier to apply to this element
     * @returns {RegexBuilder}
     */
    this.anyOf = function (textArray, quantifier) {
        if (textArray === null || textArray === undefined) {
            return this;
        }
        if (!(textArray instanceof Array)) {
            return this.text(textArray, quantifier);
        }
        if (textArray.length === 1) {
            return this.text(textArray[0], quantifier);
        }
        if (textArray.length > 1) {
            return this
                .startNonCapturingGroup()
                .regexText(textArray
                    .map(function(t){
                        return makeSafeForRegex(t);
                    })
                    .join("|")
                )
                .endGroup(quantifier);
        }

        return this;
    };



    // ANCHORS (ZERO-WIDTH ASSERTIONS)

    /**
     * Add a zero-width anchor element to match the start of the string.
     *
     * @returns {RegexBuilder}
     */
    this.startOfString = function () {
        _regexString += "^";
        return this;
    };

    /**
     * Add a zero-width anchor element to match the end of the string.
     *
     * @returns {RegexBuilder}
     */
    this.endOfString = function () {
        _regexString += "$";
        return this;
    };

    /**
     * Add a zero-width anchor element to match the boundary between an alphanumeric/underscore character and either a
     * non-alphanumeric, non-underscore character or the start/end of the string.
     *
     * @returns {RegexBuilder}
     */
    this.wordBoundary = function () {
        _regexString += "\\b";
        return this;
    };



    // GROUPING

    /**
     * Start a capture group. Capture groups have two purposes: they group part of the expression so it can have
     * quantifiers applied to it, and they capture the results of each group match and allow you to access them
     * afterwards by indexing into the object returned by RegExp.exec().
     *
     * If you don't want to capture the group match, use startNonCapturingGroup().
     *
     * Note: all groups must be ended with endGroup() before calling buildRegex().
     *
     * @returns {RegexBuilder}
     */
    this.startGroup = function () {
        _regexString += "(";
        _openGroupCount++;
        return this;
    };

    /**
     * Start a non-capturing group. Non-capturing groups group part of the expression so it can have quantifiers applied
     * to it, but do not capture the results of each group match, meaning you can't access them afterwards by indexing
     * into the object returned by RegExp.exec().
     *
     * If you want to capture the group match, use startGroup().
     *
     * Note: all groups must be ended with endGroup() before calling buildRegex().
     *
     * @returns {RegexBuilder}
     */
    this.startNonCapturingGroup = function () {
        _regexString += "(?:";
        _openGroupCount++;
        return this;
    };

    /**
     * End the innermost group previously started with startGroup() or startNonCapturingGroup().
     *
     * @param quantifier    (Optional) Quantifier to apply to this group
     * @returns {RegexBuilder}
     */
    this.endGroup = function (quantifier) {
        if (_openGroupCount === 0) {
            throw new Error("Cannot call endGroup() until a group has been started with startGroup()");
        }
        _regexString += ")";
        _openGroupCount--;
        addQuantifier(quantifier);
        return this;
    };
};

