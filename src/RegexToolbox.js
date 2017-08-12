"use strict";

var RegexQuantifier = function(regexString) {
    if (!(typeof(regexString) === "string" || regexString instanceof String)) {
        throw new Error("regexString must be a String");
    }

    this.r = regexString;
};



/**
 * Quantifier to match the preceding element zero or more times
 * @type {RegexQuantifier}
 */
RegexQuantifier.zeroOrMore = new RegexQuantifier("*");

/**
 * Quantifier to match the preceding element one or more times
 * @type {RegexQuantifier}
 */
RegexQuantifier.oneOrMore = new RegexQuantifier("+");

/**
 * Quantifier to match the preceding element once or not at all
 * @type {RegexQuantifier}
 */
RegexQuantifier.noneOrOne = new RegexQuantifier("?");

RegexQuantifier.exactly = function(times) {
    return new RegexQuantifier("{" + times + "}");
};

RegexQuantifier.atLeast = function(minimum) {
    return new RegexQuantifier("{" + minimum + ",}");
};

RegexQuantifier.noMoreThan = function(maximum) {
    return new RegexQuantifier("{0," + maximum + "}");
};

RegexQuantifier.between = function(minimum, maximum) {
    return new RegexQuantifier("{" + minimum + "," + maximum + "}");
};

var RegexBuilder = function () {
    var _openGroupCount = 0;
    var _stringBuilder = "";



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
        _stringBuilder += quantifier.r;
    };

    var isString = function(s) {
        return typeof(s) === "string" || s instanceof String;
    };



    // BUILD METHOD

    this.buildRegex = function () {
        if (_openGroupCount === 1) {
            throw new Error("One group is still open");
        }
        if (_openGroupCount > 1) {
            throw new Error(_openGroupCount + "groups are still open");
        }

        return new RegExp(_stringBuilder);
    };



    // CHARACTER MATCHES

    this.text = function (text, quantifier) {
        return this.regexText(makeSafeForRegex(text), quantifier);
    };

    this.regexText = function (text, quantifier) {
        if (text === null || text === undefined || text.length === 0) {
            return this;
        }
        if (!isString(text)) {
            throw new Error("text must be a String");
        }
        if (!quantifier) {
            _stringBuilder += text;
            return this;
        }

        return this
            .startNonCapturingGroup()
            .regexText(text)
            .endGroup(quantifier);
    };

    this.anyCharacter = function (quantifier) {
        _stringBuilder += ".";
        addQuantifier(quantifier);
        return this;
    };

    this.whitespace = function (quantifier) {
        _stringBuilder += "\\s";
        addQuantifier(quantifier);
        return this;
    };

    this.nonWhitespace = function (quantifier) {
        _stringBuilder += "\\S";
        addQuantifier(quantifier);
        return this;
    };

    this.digit = function (quantifier) {
        _stringBuilder += "\\d";
        addQuantifier(quantifier);
        return this;
    };

    this.nonDigit = function (quantifier) {
        _stringBuilder += "\\D";
        addQuantifier(quantifier);
        return this;
    };

    this.letter = function (quantifier) {
        _stringBuilder += "[a-zA-Z]";
        addQuantifier(quantifier);
        return this;
    };

    this.nonLetter = function (quantifier) {
        _stringBuilder += "[^a-zA-Z]";
        addQuantifier(quantifier);
        return this;
    };

    this.uppercaseLetter = function (quantifier) {
        _stringBuilder += "[A-Z]";
        addQuantifier(quantifier);
        return this;
    };

    this.lowercaseLetter = function (quantifier) {
        _stringBuilder += "[a-z]";
        addQuantifier(quantifier);
        return this;
    };

    this.letterOrDigit = function (quantifier) {
        _stringBuilder += "[a-zA-Z0-9]";
        addQuantifier(quantifier);
        return this;
    };

    this.nonLetterOrDigit = function (quantifier) {
        _stringBuilder += "[^a-zA-Z0-9]";
        addQuantifier(quantifier);
        return this;
    };

    this.hexDigit = function (quantifier) {
        _stringBuilder += "[0-9A-Fa-f]";
        addQuantifier(quantifier);
        return this;
    };

    this.uppercaseHexDigit = function (quantifier) {
        _stringBuilder += "[0-9A-F]";
        addQuantifier(quantifier);
        return this;
    };

    this.lowercaseHexDigit = function (quantifier) {
        _stringBuilder += "[0-9a-f]";
        addQuantifier(quantifier);
        return this;
    };

    this.nonHexDigit = function (quantifier) {
        _stringBuilder += "[^0-9A-Fa-f]";
        addQuantifier(quantifier);
        return this;
    };

    this.wordCharacter = function (quantifier) {
        _stringBuilder += "\\w";
        addQuantifier(quantifier);
        return this;
    };

    this.nonWordCharacter = function (quantifier) {
        _stringBuilder += "\\W";
        addQuantifier(quantifier);
        return this;
    };

    this.anyCharacterFrom = function (characters, quantifier) {
        _stringBuilder += "[" + makeSafeForCharacterClass(characters) + "]";
        addQuantifier(quantifier);
        return this;
    };

    this.anyCharacterExcept = function (characters, quantifier) {
        _stringBuilder += "[^" + makeSafeForCharacterClass(characters) + "]";
        addQuantifier(quantifier);
        return this;
    };

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

    this.startOfString = function () {
        _stringBuilder += "^";
        return this;
    };

    this.endOfString = function () {
        _stringBuilder += "$";
        return this;
    };

    this.wordBoundary = function () {
        _stringBuilder += "\\b";
        return this;
    };



    // GROUPING

    this.startGroup = function () {
        _stringBuilder += "(";
        _openGroupCount++;
        return this;
    };

    this.startNonCapturingGroup = function () {
        _stringBuilder += "(?:";
        _openGroupCount++;
        return this;
    };

    this.endGroup = function (quantifier) {
        if (_openGroupCount === 0) {
            throw new Error("Cannot call endGroup() until a group has been started with startGroup()");
        }
        _stringBuilder += ")";
        _openGroupCount--;
        addQuantifier(quantifier);
        return this;
    };
};

