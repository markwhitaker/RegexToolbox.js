export default class RegexQuantifier {
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

    get butAsFewAsPossible() {
        if (!this.#isGreedy) {
            throw new Error("butAsFewAsPossible can't be called on this quantifier")
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
