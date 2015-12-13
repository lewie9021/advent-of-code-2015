import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 4: The Ideal Stocking Stuffer";

export function getHashWithFiveZeros(key) {
    
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is find the hash which, in hexadecimal, start with at least five zeroes?", getHashWithFiveZeros(input));
}
