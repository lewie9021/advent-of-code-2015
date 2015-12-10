import FS from "fs";
import Path from "path";
import _ from "lodash";

export const title = "Day 2: I Was Told There Would Be No Math";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const measurements = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("All numbers in the elves' list are in feet. How many total square feet of wrapping paper should they order?");
}
