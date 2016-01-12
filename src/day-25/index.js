import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 25: Let It Snow";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What code do you give the machine?");
}
