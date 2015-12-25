import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 16: Aunt Sue";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("What is the number of the Sue that got you the gift?");
}
