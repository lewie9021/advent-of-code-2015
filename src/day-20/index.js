import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 20: Infinite Elves and Infinite Houses";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the lowest house number of the house to get at least as many presents as the number in your puzzle input?");
}
