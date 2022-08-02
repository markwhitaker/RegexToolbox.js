"use strict";

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

export default RegexOptions;