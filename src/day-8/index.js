import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 8: Matchsticks";

export function charactersInCode(string) {
    return string.length;
}

export function charactersEscapedInMemory(string) {
    const str = string
              // Replace each bashlash with '\\'.
              .replace(/\\/g, "\\\\")
              // Replace each double quote with '\"'.
              .replace(/\"/g, "\\\"");
    
    return str.length + 2;
}

export function charactersInMemory(string) {
    const pattern = /(\\x([0-9]|[a-f]){2})/g;
    const str = string
              // Replace each '\x' plus two Hexadecimal characters with the Unicode representation.
              .replace(pattern, (match) => {
                  const code = parseInt(match.substr(2), 16);
                  
                  return String.fromCharCode(code);
              })
              // Replace each '\"' with a double quote.
              .replace(/\\"/g, "\"")
              // Replace each '\\' with a backslash.
              .replace(/\\\\/g, "\\");
    
    return str.length - 2;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const totalPartOne = _.compose(_.sum, _.map((x) => charactersInCode(x) - charactersInMemory(x)));
    const totalPartTwo = _.compose(_.sum, _.map((x) => charactersEscapedInMemory(x) - charactersInCode(x)));

    console.log("What is the number of characters of code for string literals minus the number of characters in memory for the values of the strings in total for the entire file?", totalPartOne(input));
    console.log("What is the total number of characters to represent the newly encoded strings minus the number of characters of code in each original string literal?", totalPartTwo(input));
}
