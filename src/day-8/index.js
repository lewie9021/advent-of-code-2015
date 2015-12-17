import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 8: Matchsticks";

export function charactersInCode(string) {
    return string.length;
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
    const characterCount = (x) => charactersInCode(x) - charactersInMemory(x);
    const total = _.compose(_.sum, _.map(characterCount));

    console.log("what is the number of characters of code for string literals minus the number of characters in memory for the values of the strings in total for the entire file?", total(input));
}
