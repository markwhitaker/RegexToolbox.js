import { describe, test, expect } from "bun:test";
import {RegexQuantifier} from "../index.js";

describe("RegexQuantifier", () => {
    test("Test RegexQuantifier constructor error", () => {
        expect(() => {
            new RegexQuantifier("test");
        }).toThrow("RegexQuantifier constructor is private");
    });
});
