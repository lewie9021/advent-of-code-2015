import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 12: JSAbacusFramework.io";

export function run() {
    const inputPath = Path.join(__dirname, "input.json");
    const input = JSON.parse(FS.readFileSync(inputPath, "utf-8"));
    
    console.log("What is the sum of all numbers in the document?");
}
