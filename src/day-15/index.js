import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 15: Science for Hungry People";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the total score of the highest-scoring cookie you can make?");
}
