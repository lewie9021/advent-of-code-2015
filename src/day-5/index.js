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

export function isNiceString2(string) {
    const getSandwichDoubles = (counts, l, i, arr) => {
        if (!i)
            return counts;

        // Contains a pair of any two letters that appears at least twice
        // in the string without overlapping.
        const double = arr[i - 1] + arr[i];
        const rest = arr.slice(i + 1).join("");

        if (rest.indexOf(double) != -1)
            counts.doubles[double] = null;

        // Contains at least one letter which repeats with exactly one
        // letter between them.
        const sandwich = arr.slice(i - 1, i + 2);

        if (sandwich[0] == sandwich[2])
            counts.sandwiches[sandwich.join("")] = null;
        
        return counts;
    };

    const counts = _.reduce(getSandwichDoubles, {doubles: {}, sandwiches: {}}, string.split(""));

    return !!(Object.keys(counts.doubles).length && Object.keys(counts.sandwiches).length);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const niceStrings = _.compose(_.get("length"), _.filter(isNiceString));
    const niceStrings2 = _.compose(_.get("length"), _.filter(isNiceString2));
    
    console.log("How many strings are nice?", niceStrings(input));
    console.log("How many strings are nice (revision 2)?", niceStrings2(input));
}
