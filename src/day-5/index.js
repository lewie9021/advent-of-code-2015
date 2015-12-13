import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split } from "../helpers";

export const title = "Day 5: Doesn't He Have Intern-Elves For This?";



export function isNiceString(string) {
    // Contains at least 3 vowels.
    const vowels = ["a", "e", "i", "o", "u"];
    const threeVowels = _.compose(_.gte(3), _.get("length"), _.filter((x) => _.includes(x, vowels)), split(""));
    
    // Contains at least one letter that appears twice.
    const pattern = /([a-z])\1+/;
    const duplicateLetters = (str) => pattern.test(str);
    
    // Doesn't contain 'ab', 'cd', 'pq', or 'xy'.
    const blacklist = ["ab", "cd", "pq", "xy"];
    const getMatches = _.curry((list, string) => _.filter((x) => _.includes(x, string), list));
    const blacklistWords = _.compose(_.gte(1), _.get("length"), getMatches(blacklist));

    return threeVowels(string) && duplicateLetters(string) && !blacklistWords(string);
}

function getSandwichDoubles(x) {
    return _.reduce((counts, l, i, arr) => {
        if (!i)
            return counts;

        const fragment = arr.slice(i - 1, i + 2).join("");
        
        // Contains a pair of any two letters that appears at least twice
        // in the string without overlapping.
        const double = fragment.substr(0, 2);
        const rest = arr.slice(i + 1).join("");

        if (rest.indexOf(double) != -1)
            counts.doubles[double] = null;

        // Contains at least one letter which repeats with exactly one
        // letter between them.
        if (fragment[0] === fragment[2])
            counts.sandwiches[fragment] = null;
        
        return counts;
    }, {
        doubles: {},
        sandwiches: {}
    }, x);
}

export function isNiceString2(string) {
    const found = _.compose(_.get("length"), Object.keys);
    const counts = _.compose(getSandwichDoubles, split(""));
    const isValid = _.compose(_.isEqual(2), _.get("length"), _.filter(_.gte(1)), _.map(found), counts);

    return isValid(string);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const niceStrings = _.compose(_.get("length"), _.filter(isNiceString));
    const niceStrings2 = _.compose(_.get("length"), _.filter(isNiceString2));
    
    console.log("How many strings are nice?", niceStrings(input));
    console.log("How many strings are nice (revision 2)?", niceStrings2(input));
}
