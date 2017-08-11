"use strict";

var RegexQuantifier = function(regexString) {
    if (!(typeof(regexString) === "string" || regexString instanceof String)) {
        throw new Error("regexString must be a String");
    }

    this.regexString = regexString;
};

RegexQuantifier.prototype.toString = function(){
    return this.regexString;
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

var RegexBuilder = function (parent) {
    if (parent && !(parent instanceof RegexBuilder)) {
        throw new Error("parent must be a RegexBuilder object");
    }

    this.parent = parent;

    this.stringBuilder = (this.parent && this.parent.stringBuilder)
        ? this.parent.stringBuilder
        : "";



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

    var addQuantifier = function (regexBuilder, quantifier) {
        if (!quantifier) {
            return;
        }
        if (!(quantifier instanceof RegexQuantifier)) {
            throw new Error("quantifier must be a RegexQuantifier");
        }
        regexBuilder.stringBuilder += quantifier.toString();
    };

    var isString = function(s) {
        return typeof(s) === "string" || s instanceof String;
    };



    // BUILD METHOD

    this.buildRegex = function () {
        if (this.parent) {
            throw new Error("At least one group is still open");
        }

        return new RegExp(this.stringBuilder);
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
            this.stringBuilder += text;
            return this;
        }

        return this
            .startNonCapturingGroup()
            .regexText(text)
            .endGroup(quantifier);
    };

    this.anyCharacter = function (quantifier) {
        this.stringBuilder += ".";
        addQuantifier(this, quantifier);
        return this;
    };

    this.whitespace = function (quantifier) {
        this.stringBuilder += "\\s";
        addQuantifier(this, quantifier);
        return this;
    };

    this.nonWhitespace = function (quantifier) {
        this.stringBuilder += "\\S";
        addQuantifier(this, quantifier);
        return this;
    };

    this.digit = function (quantifier) {
        this.stringBuilder += "\\d";
        addQuantifier(this, quantifier);
        return this;
    };

    this.nonDigit = function (quantifier) {
        this.stringBuilder += "\\D";
        addQuantifier(this, quantifier);
        return this;
    };

    this.letter = function (quantifier) {
        this.stringBuilder += "[a-zA-Z]";
        addQuantifier(this, quantifier);
        return this;
    };

    this.nonLetter = function (quantifier) {
        this.stringBuilder += "[^a-zA-Z]";
        addQuantifier(this, quantifier);
        return this;
    };

    this.uppercaseLetter = function (quantifier) {
        this.stringBuilder += "[A-Z]";
        addQuantifier(this, quantifier);
        return this;
    };

    this.lowercaseLetter = function (quantifier) {
        this.stringBuilder += "[a-z]";
        addQuantifier(this, quantifier);
        return this;
    };

    this.letterOrDigit = function (quantifier) {
        this.stringBuilder += "[a-zA-Z0-9]";
        addQuantifier(this, quantifier);
        return this;
    };

    this.nonLetterOrDigit = function (quantifier) {
        this.stringBuilder += "[^a-zA-Z0-9]";
        addQuantifier(this, quantifier);
        return this;
    };

    this.hexDigit = function (quantifier) {
        this.stringBuilder += "[0-9A-Fa-f]";
        addQuantifier(this, quantifier);
        return this;
    };

    this.uppercaseHexDigit = function (quantifier) {
        this.stringBuilder += "[0-9A-F]";
        addQuantifier(this, quantifier);
        return this;
    };

    this.lowercaseHexDigit = function (quantifier) {
        this.stringBuilder += "[0-9a-f]";
        addQuantifier(this, quantifier);
        return this;
    };

    this.nonHexDigit = function (quantifier) {
        this.stringBuilder += "[^0-9A-Fa-f]";
        addQuantifier(this, quantifier);
        return this;
    };

    this.wordCharacter = function (quantifier) {
        this.stringBuilder += "\\w";
        addQuantifier(this, quantifier);
        return this;
    };

    this.nonWordCharacter = function (quantifier) {
        this.stringBuilder += "\\W";
        addQuantifier(this, quantifier);
        return this;
    };

    this.anyCharacterFrom = function (characters, quantifier) {
        this.stringBuilder += "[" + makeSafeForCharacterClass(characters) + "]";
        addQuantifier(this, quantifier);
        return this;
    };

    this.anyCharacterExcept = function (characters, quantifier) {
        this.stringBuilder += "[^" + makeSafeForCharacterClass(characters) + "]";
        addQuantifier(this, quantifier);
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
        this.stringBuilder += "^";
        return this;
    };

    this.endOfString = function () {
        this.stringBuilder += "$";
        return this;
    };

    this.wordBoundary = function () {
        this.stringBuilder += "\\b";
        return this;
    };



    // GROUPING

    this.startGroup = function () {
        this.stringBuilder += "(";
        return new RegexBuilder(this);
    };

    this.startNonCapturingGroup = function () {
        this.stringBuilder += "(?:";
        return new RegexBuilder(this);
    };

    this.endGroup = function (quantifier) {
        if (!this.parent) {
            throw new Error("Cannot call endGroup() until a group has been started with startGroup()");
        }
        this.stringBuilder += ")";
        addQuantifier(this, quantifier);
        this.parent.stringBuilder = this.stringBuilder;
        return this.parent;
    };
};

