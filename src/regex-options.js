/**
 * Options that can be passed to RegexBuilder.buildRegex()
 */
export default class RegexOptions {
    static #privateToken = {}
    #str = "";

    constructor(str, token) {
        if (token !== RegexOptions.#privateToken) {
            throw new Error("RegexOptions constructor is private");
        }
        this.#str = str;
    }

    get string() {
        return this.#str;
    }

    /**
     * Make the regex case-insensitive
     */
    static IGNORE_CASE = new RegexOptions("i", RegexOptions.#privateToken);

    /**
     * Make the regex match all occurrences in a string rather than just the first
     */
    static MATCH_ALL = new RegexOptions("g", RegexOptions.#privateToken);

    /**
     * Cause startOfString() and endOfString() to also match line breaks within a multi-line string
     */
    static MULTI_LINE = new RegexOptions("m", RegexOptions.#privateToken);
}
