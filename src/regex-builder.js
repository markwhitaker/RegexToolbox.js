"use strict";

import RegexOptions from "./regex-options.js";
import RegexQuantifier from "./regex-quantifier.js";

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
export default class RegexBuilder {
  #regexString = "";
  #flags = new Set();

  /**
   * Build and return a RegExp object from the current builder state.
   * After calling this the builder is cleared and ready to re-use.
   *
   * @param options   Array of RegexOptions values to apply to the regex
   * @returns {RegExp}
   */
  buildRegex(options = undefined) {
    if (options) {
      if (!(options instanceof Array)) {
        options = [options];
      }
      if (!options.every(x => x instanceof RegexOptions)) {
        throw new Error("All options passed to constructor must be of type RegexOptions");
      }
      options
          .map(opt => opt.string)
          .forEach(str => this.#flags.add(str));
    }

    let flagsStr = "";
    this.#flags.forEach(flagStr => flagsStr += flagStr);
    const regex = new RegExp(this.#regexString, flagsStr);
    this.#regexString = "";
    this.#flags.clear();
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
  text(text, quantifier = undefined) {
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
  regexText(text, quantifier = undefined) {
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

    return this.nonCapturingGroup(r => r
        .regexText(text, undefined),
        quantifier);
  }

  /**
   * Add an element to match any character.
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  anyCharacter(quantifier = undefined) {
    return this.#addPart(".", quantifier);
  }

  /**
   * Add an element to match any single whitespace character.
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  whitespace(quantifier = undefined) {
    return this.#addPart("\\s", quantifier);
  }

  /**
   * Add an element to match any single non-whitespace character.
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  nonWhitespace(quantifier = undefined) {
    return this.#addPart("\\S", quantifier);
  }

  /**
   * Add an element to represent any amount of white space, including none. This is just a convenient alias for
   * whitespace(RegexQuantifier.zeroOrMore).
   */
  possibleWhitespace() {
    return this.whitespace(RegexQuantifier.zeroOrMore);
  }

  /**
   * Add an element to match a single space character. If you want to match any kind of white space, use
   * whitespace().
   *
   * @param quantifier Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  space(quantifier = undefined) {
    return this.#addPart(" ", quantifier);
  }

  /**
   * Add an element to match a single tab character.
   *
   * @param quantifier Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  tab(quantifier = undefined) {
    return this.#addPart("\\t", quantifier);
  }

  /**
   * Add an element to match a single carriage return character.
   *
   * @param quantifier Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  carriageReturn(quantifier = undefined) {
    return this.#addPart("\\r", quantifier);
  }

  /**
   * Add an element to match a single line feed character.
   *
   * @param quantifier Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  lineFeed(quantifier = undefined) {
    return this.#addPart("\\n", quantifier);
  }

  /**
   * Add an element to match any single decimal digit (0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  digit(quantifier = undefined) {
    return this.#addPart("\\d", quantifier);
  }

  /**
   * Add an element to match any character that is not a decimal digit (0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  nonDigit(quantifier = undefined) {
    return this.#addPart("\\D", quantifier);
  }

  /**
   * Add an element to match any Unicode letter.
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  letter(quantifier = undefined) {
    this.#addUnicodeFlag();
    return this.#addPart("\\p{L}", quantifier);
  }

  /**
   * Add an element to match any character that is not a Unicode letter.
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  nonLetter(quantifier = undefined) {
    this.#addUnicodeFlag();
    return this.#addPart("\\P{L}", quantifier);
  }

  /**
   * Add an element to match any upper-case Unicode letter.
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  uppercaseLetter(quantifier = undefined) {
    this.#addUnicodeFlag();
    return this.#addPart("\\p{Lu}", quantifier);
  }

  /**
   * Add an element to match any lowercase Unicode letter.
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  lowercaseLetter(quantifier = undefined) {
    this.#addUnicodeFlag();
    return this.#addPart("\\p{Ll}", quantifier);
  }

  /**
   * Add an element to match any Unicode letter or decimal digit (0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  letterOrDigit(quantifier = undefined) {
    this.#addUnicodeFlag();
    return this.#addPart("[\\p{L}0-9]", quantifier);
  }

  /**
   * Add an element to match any character that is not a Unicode letter or a decimal digit (0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  nonLetterOrDigit(quantifier = undefined) {
    this.#addUnicodeFlag();
    return this.#addPart("[^\\p{L}0-9]", quantifier);
  }

  /**
   * Add an element to match any hexadecimal digit (a-f, A-F, 0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  hexDigit(quantifier = undefined) {
    return this.#addPart("[0-9A-Fa-f]", quantifier);
  }

  /**
   * Add an element to match any uppercase hexadecimal digit (A-F, 0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  uppercaseHexDigit(quantifier = undefined) {
    return this.#addPart("[0-9A-F]", quantifier);
  }

  /**
   * Add an element to match any lowercase hexadecimal digit (a-f, 0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  lowercaseHexDigit(quantifier = undefined) {
    return this.#addPart("[0-9a-f]", quantifier);
  }

  /**
   * Add an element to match any character that is not a hexadecimal digit (a-f, A-F, 0-9).
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  nonHexDigit(quantifier = undefined) {
    return this.#addPart("[^0-9A-Fa-f]", quantifier);
  }

  /**
   * Add an element to match any Unicode alphabet letter, decimal digit, or underscore.
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  wordCharacter(quantifier = undefined) {
    this.#addUnicodeFlag();
    return this.#addPart("[\\p{L}0-9_]", quantifier);
  }

  /**
   * Add an element to match any character that is not a Unicode alphabet letter, decimal digit, or underscore.
   *
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  nonWordCharacter(quantifier = undefined) {
    this.#addUnicodeFlag();
    return this.#addPart("[^\\p{L}0-9_]", quantifier);
  }

  /**
   * Add an element (a character class) to match any of the characters provided.
   *
   * @param characters    String containing all characters to include in the character class
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  anyCharacterFrom(characters, quantifier = undefined) {
    return this.#addPart("[" + RegexBuilder.#makeSafeForCharacterClass(characters) + "]", quantifier);
  }

  /**
   * Add an element (a character class) to match any character except those provided.
   *
   * @param characters    String containing all characters to exclude from the character class
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  anyCharacterExcept(characters, quantifier = undefined) {
    return this.#addPart("[^" + RegexBuilder.#makeSafeForCharacterClass(characters) + "]", quantifier);
  }

  /**
   * Add a group of alternatives, to match any of the strings provided.
   *
   * @param textArray     A number of strings, any one of which will be matched
   * @param quantifier    (Optional) Quantifier to apply to this element
   * @returns {RegexBuilder}
   */
  anyOf(textArray, quantifier = undefined) {
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
          .nonCapturingGroup(r => r
              .regexText(textArray
                      .map(t => RegexBuilder.#makeSafeForRegex(t))
                      .join("|"),
                  undefined
              ), quantifier);
    }

    return this;
  }

  /**
   * Add a zero-width anchor element to match the start of the string.
   *
   * @returns {RegexBuilder}
   */
  startOfString() {
    return this.#addPart("^");
  }

  /**
   * Add a zero-width anchor element to match the end of the string.
   *
   * @returns {RegexBuilder}
   */
  endOfString() {
    return this.#addPart("$");
  }

  /**
   * Add a zero-width anchor element to match the boundary between an alphanumeric/underscore character and either a
   * non-alphanumeric, non-underscore character or the start/end of the string.
   *
   * @returns {RegexBuilder}
   */
  wordBoundary() {
    return this.#addPart("\\b");
  }

  /**
   * Add a capture group. Capture groups have two purposes: they group part of the expression so it can have
   * quantifiers applied to it, and they capture the results of each group match and allow you to access them
   * afterwards by indexing into the object returned by RegExp.exec().
   *
   * If you don't want to capture the group match, use nonCapturingGroup().
   *
   * @param steps       A function passing a RegexBuilder object used to build the regex inside the group
   * @param quantifier  (Optional) Quantifier to apply to the group
   * @returns {RegexBuilder}
   */
  group(steps, quantifier = undefined) {
    if (!steps instanceof Function) {
      throw new Error("The steps argument must be a function");
    }
    this.#addPart("(");
    steps(this);
    return this.#endGroup(quantifier);
  }

  /**
   * Add a named capture group. This works the same as group() but the captured group can be referenced by name from the
   * object returned by RegExp.exec(), e.g.
   *
   * const regex = new RegexBuilder()
   *     .namedGroup("firstName", g => g.letter(RegexQuantifier.oneOrMore)
   *     .buildRegex();
   * const name = regex.exec(input).groups.firstName;
   *
   * @param name        Name this group will be retrieved by
   * @param steps       A function passing a RegexBuilder object used to build the regex inside the group
   * @param quantifier  (Optional) Quantifier to apply to the group
   * @returns {RegexBuilder}
   */
  namedGroup(name, steps, quantifier = undefined) {
    if (!steps instanceof Function) {
      throw new Error("The steps argument must be a function");
    }
    this.#addPart("(?<" + name + ">");
    steps(this);
    return this.#endGroup(quantifier);
  }

  /**
   * Add a non-capturing group. Non-capturing groups group part of the expression so it can have quantifiers applied
   * to it, but do not capture the results of each group match, meaning you can't access them afterwards using the
   * object returned by RegExp.exec().
   *
   * If you want to capture the group match, use startGroup() or startNamedGroup().
   *
   * @returns {RegexBuilder}
   */
  nonCapturingGroup(steps, quantifier = undefined) {
    if (!steps instanceof Function) {
      throw new Error("First argument must be a function");
    }
    this.#addPart("(?:");
    steps(this);
    return this.#endGroup(quantifier);
  }

  #endGroup(quantifier = undefined) {
    return this.#addPart(")", quantifier);
  }

  #addPart(part, quantifier = undefined) {
    this.#regexString += part;
    return this.#addQuantifier(quantifier);
  }

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

  #addUnicodeFlag() {
    this.#flags.add("u");
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
}
