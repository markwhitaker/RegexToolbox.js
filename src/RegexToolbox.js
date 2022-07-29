"use strict";


// ---------- Extensions ----------

/**
 * Return true if the array contains the supplied item
 * @param item  Item to find
 * @returns {boolean}
 */
Array.prototype.has = function (item) {
  return this.indexOf(item) > -1;
};


// ---------- RegexQuantifier ----------

class RegexQuantifier {
  static #privateToken = {}
  #regexString = ""
  #isGreedy = false

  constructor(regexString, isGreedy, token) {
    if (token !== RegexQuantifier.#privateToken) {
      throw new Error("RegexQuantifier constructor is private");
    }
    this.#regexString = regexString;
    this.#isGreedy = isGreedy;
  }

  butAsFewAsPossible() {
    if (!this.#isGreedy) {
      throw new Error("butAsFewAsPossible() can't be called on this quantifier")
    }
    return new RegexQuantifier(this.#regexString + "?", false, RegexQuantifier.#privateToken);
  }

  get regexString() {
    return this.#regexString;
  }

  /**
   * Quantifier to match the preceding element zero or more times
   * @type {RegexQuantifier}
   */
  static zeroOrMore = new RegexQuantifier("*", true, RegexQuantifier.#privateToken);

  /**
   * Quantifier to match the preceding element one or more times
   * @type {RegexQuantifier}
   */
  static oneOrMore = new RegexQuantifier("+", true, RegexQuantifier.#privateToken);

  /**
   * Quantifier to match the preceding element once or not at all
   * @type {RegexQuantifier}
   */
  static noneOrOne = new RegexQuantifier("?", true, RegexQuantifier.#privateToken);

  /**
   * Quantifier to match an exact number of occurrences of the preceding element
   * @param times The exact number of occurrences to match
   * @returns {RegexQuantifier}
   */
  static exactly(times) {
    return new RegexQuantifier("{" + times + "}", false, RegexQuantifier.#privateToken);
  }

  /**
   * Quantifier to match at least a minimum number of occurrences of the preceding element
   * @param minimum   The minimum number of occurrences to match
   * @returns {RegexQuantifier}
   */
  static atLeast(minimum) {
    return new RegexQuantifier("{" + minimum + ",}", true, RegexQuantifier.#privateToken);
  }

  /**
   * Quantifier to match no more than a maximum number of occurrences of the preceding element
   * @param maximum   The maximum number of occurrences to match
   * @returns {RegexQuantifier}
   */
  static noMoreThan(maximum) {
    return new RegexQuantifier("{0," + maximum + "}", true, RegexQuantifier.#privateToken);
  }

  /**
   * Quantifier to match at least a minimum, and no more than a maximum, occurrences of the preceding element
   * @param minimum   The minimum number of occurrences to match
   * @param maximum   The maximum number of occurrences to match
   * @returns {RegexQuantifier}
   */
  static between(minimum, maximum) {
    return new RegexQuantifier("{" + minimum + "," + maximum + "}", true, RegexQuantifier.#privateToken);
  }
}


// ---------- RegexOptions ----------

/**
 * Options that can be passed to RegexBuilder.buildRegex()
 *
 * @type {{MATCH_ALL: string, IGNORE_CASE: string, MULTI_LINE: string}}
 */
const RegexOptions = Object.freeze({
  /**
   * Make the regex case-insensitive
   */
  IGNORE_CASE: "option-ignore-case",

  /**
   * Make the regex match all occurrences in a string rather than just the first
   */
  MATCH_ALL: "option-match-all",

  /**
   * Cause startOfString() and endOfString() to also match line breaks within a multi-line string
   */
  MULTI_LINE: "option-multi-line"
});


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
class RegexBuilder {
  #openGroupCount = 0;
  #regexString = "";

  // PRIVATE METHODS

  #addQuantifier(quantifier) {
    if (!quantifier) {
      return this;
    }
    if (!(quantifier instanceof RegexQuantifier)) {
      throw new Error("quantifier must be a RegexQuantifier");
    }
    this.#regexString += quantifier.regexString;
    return this;
  }

  static #makeSafeForRegex(text) {
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
  }

  static #makeSafeForCharacterClass(text) {
    // Replace ] with \]
    let result = text.replace("]", "\\]");

    // Replace - with \-
    result = result.replace("-", "\\-");

    // replace ^ with \^ if it occurs at the start of the string
    if (result.indexOf("^") === 0) {
      result = "\\" + result;
    }

    return result;
  }

  static #isString(s) {
    return typeof(s) === "string" || s instanceof String;
  }


  // BUILD METHOD

  /**
   * Build and return a Regex object from the current builder state.
   * After calling this the builder is cleared and ready to re-use.
   *
   * @param options   Array of RegexOptions values to apply to the regex
   * @returns {RegExp}
   */
  buildRegex(options) {
    if (this.#openGroupCount === 1) {
      throw new Error("One group is still open");
    }
    if (this.#openGroupCount > 1) {
      throw new Error(this.#openGroupCount + " groups are still open");
    }

    let flags = "";
    if (options) {
      if (!(options instanceof Array)) {
        options = [options];
      }
      if (options.has(RegexOptions.MATCH_ALL)) {
        flags += "g";
      }
      if (options.has(RegexOptions.IGNORE_CASE)) {
        flags += "i";
      }
      if (options.has(RegexOptions.MULTI_LINE)) {
        flags += "m";
      }
    }

    let regex = new RegExp(this.#regexString, flags);
    this.#regexString = "";
    return regex;
  }


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
  text(text, quantifier) {
    if (text === null || text === undefined || text.length === 0) {
      return this;
    }
    if (!RegexBuilder.#isString(text)) {
      throw new Error("text must be a string");
    }
    return this.regexText(RegexBuilder.#makeSafeForRegex(text), quantifier);
  }

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
  regexText(text, quantifier) {
    if (text === null || text === undefined || text.length === 0) {
      return this;
    }
    if (!RegexBuilder.#isString(text)) {
      throw new Error("text must be a string");
    }
    if (!quantifier) {
      this.#regexString += text;
      return this;
    }

    return this
        .startNonCapturingGroup()
        .regexText(text, undefined)
        .endGroup(quantifier);
  }

  /**
   * Add an element to match any character.
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  anyCharacter(quantifier) {
    this.#regexString += ".";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any single whitespace character.
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  whitespace(quantifier) {
    this.#regexString += "\\s";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any single non-whitespace character.
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  nonWhitespace(quantifier) {
    this.#regexString += "\\S";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any single decimal digit (0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  digit(quantifier) {
    this.#regexString += "\\d";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any character that is not a decimal digit (0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  nonDigit(quantifier) {
    this.#regexString += "\\D";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any letter in the Roman alphabet (a-z, A-Z).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  letter(quantifier) {
    this.#regexString += "[a-zA-Z]";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any character that is not a letter in the Roman alphabet (a-z, A-Z).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  nonLetter(quantifier) {
    this.#regexString += "[^a-zA-Z]";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any upper-case letter in the Roman alphabet (A-Z).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  uppercaseLetter(quantifier) {
    this.#regexString += "[A-Z]";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any lowercase letter in the Roman alphabet (a-z).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  lowercaseLetter(quantifier) {
    this.#regexString += "[a-z]";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any letter in the Roman alphabet or decimal digit (a-z, A-Z, 0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  letterOrDigit(quantifier) {
    this.#regexString += "[a-zA-Z0-9]";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any character that is not letter in the Roman alphabet or a decimal digit (a-z, A-Z, 0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  nonLetterOrDigit(quantifier) {
    this.#regexString += "[^a-zA-Z0-9]";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any hexadecimal digit (a-f, A-F, 0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  hexDigit(quantifier) {
    this.#regexString += "[0-9A-Fa-f]";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any uppercase hexadecimal digit (A-F, 0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  uppercaseHexDigit(quantifier) {
    this.#regexString += "[0-9A-F]";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any lowercase hexadecimal digit (a-f, 0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  lowercaseHexDigit(quantifier) {
    this.#regexString += "[0-9a-f]";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any character that is not a hexadecimal digit (a-f, A-F, 0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  nonHexDigit(quantifier) {
    this.#regexString += "[^0-9A-Fa-f]";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any Roman alphabet letter, decimal digit, or underscore (a-z, A-Z, 0-9, _).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  wordCharacter(quantifier) {
    this.#regexString += "\\w";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element to match any character that is not a Roman alphabet letter, decimal digit, or underscore
   * (a-z, A-Z, 0-9, _)
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  nonWordCharacter(quantifier) {
    this.#regexString += "\\W";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element (a character class) to match any of the characters provided.
   *
   * @param characters    String containing all characters to include in the character class
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  anyCharacterFrom(characters, quantifier) {
    this.#regexString += "[" + RegexBuilder.#makeSafeForCharacterClass(characters) + "]";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add an element (a character class) to match any character except those provided.
   *
   * @param characters    String containing all characters to exclude from the character class
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  anyCharacterExcept(characters, quantifier) {
    this.#regexString += "[^" + RegexBuilder.#makeSafeForCharacterClass(characters) + "]";
    return this.#addQuantifier(quantifier);
  }

  /**
   * Add a group of alternatives, to match any of the strings provided.
   *
   * @param textArray     A number of strings, any one of which will be matched
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  anyOf(textArray, quantifier) {
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
              .map(function (t) {
                return RegexBuilder.#makeSafeForRegex(t);
              })
              .join("|"),
              undefined
          )
          .endGroup(quantifier);
    }

    return this;
  }


  // ANCHORS (ZERO-WIDTH ASSERTIONS)

  /**
   * Add a zero-width anchor element to match the start of the string.
   *
   * @returns {RegexBuilder}
   */
  startOfString() {
    this.#regexString += "^";
    return this;
  }

  /**
   * Add a zero-width anchor element to match the end of the string.
   *
   * @returns {RegexBuilder}
   */
  endOfString() {
    this.#regexString += "$";
    return this;
  }

  /**
   * Add a zero-width anchor element to match the boundary between an alphanumeric/underscore character and either a
   * non-alphanumeric, non-underscore character or the start/end of the string.
   *
   * @returns {RegexBuilder}
   */
  wordBoundary() {
    this.#regexString += "\\b";
    return this;
  }


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
  startGroup() {
    this.#regexString += "(";
    this.#openGroupCount++;
    return this;
  }

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
  startNonCapturingGroup() {
    this.#regexString += "(?:";
    this.#openGroupCount++;
    return this;
  }

  /**
   * End the innermost group previously started with startGroup() or startNonCapturingGroup().
   *
   * @param quantifier    (Optional) Quantifier to apply to this group
   * @returns {RegexBuilder}
   */
  endGroup(quantifier) {
    if (this.#openGroupCount === 0) {
      throw new Error("Cannot call endGroup() until a group has been started with startGroup()");
    }
    this.#regexString += ")";
    this.#openGroupCount--;
    return this.#addQuantifier(quantifier);
  }
}
