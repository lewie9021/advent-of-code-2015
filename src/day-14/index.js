import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 14: Reindeer Olympics";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("After exactly 2503 seconds, what distance has the winning reindeer traveled?");
}
