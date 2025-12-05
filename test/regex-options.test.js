import { describe, test, expect } from "bun:test";
import {RegexOptions} from "../index.js";

describe("RegexOptions", () => {
    test("Test RegexOptions constructor error", () => {
        expect(() => {
            new RegexOptions("test");
        }).toThrow("RegexOptions constructor is private");
    });
});
