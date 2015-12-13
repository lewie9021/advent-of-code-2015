import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split } from "../helpers";

export const title = "Day 5: Doesn't He Have Intern-Elves For This?";

export function isNiceString(str) {
    // Contains at least 3 vowels.
    const vowels = ["a", "e", "i", "o", "u"];
    const threeVowels = _.compose(_.gte(3), _.get("length"), _.filter((x) => _.includes(x, vowels)), split(""))(str);
    
    // Contains at least one letter that appears twice.
    
    
    // Doesn't contain 'ab', 'cd', 'pq', or 'xy'.

    
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("How many strings are nice?");
}
