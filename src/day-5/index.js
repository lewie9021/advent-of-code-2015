import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 5: Doesn't He Have Intern-Elves For This?";

export function isNiceString(str) {
    
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("How many strings are nice?");
}
