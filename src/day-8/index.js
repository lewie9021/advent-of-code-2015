import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 8: Matchsticks";

export function charactersInCode() {
    
}

export function charactersInMemory(string) {
    return string.length;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("what is the number of characters of code for string literals minus the number of characters in memory for the values of the strings in total for the entire file?");
}
