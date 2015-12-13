import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split } from "../helpers";

export const title = "Day 5: Doesn't He Have Intern-Elves For This?";

const getMatches = _.curry((list, string) => _.filter((x) => _.includes(x, string), list));

export function isNiceString(string) {
    // Contains at least 3 vowels.
    const vowels = ["a", "e", "i", "o", "u"];
    const threeVowels = _.compose(_.gte(3), _.get("length"), _.filter((x) => _.includes(x, vowels)), split(""));
    
    // Contains at least one letter that appears twice.
    const pattern = /([a-z])\1+/;
    const duplicateLetters = (str) => pattern.test(str);
    
    // Doesn't contain 'ab', 'cd', 'pq', or 'xy'.
    const blacklist = ["ab", "cd", "pq", "xy"];
    const blacklistWords = _.compose(_.gte(1), _.get("length"), getMatches(blacklist));

    return threeVowels(string) && duplicateLetters(string) && !blacklistWords(string);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const niceStrings = _.compose(_.get("length"), _.filter(isNiceString));
    
    console.log("How many strings are nice?", niceStrings(input));
}
