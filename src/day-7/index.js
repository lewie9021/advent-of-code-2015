import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 7: Some Assembly Required";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("In little Bobby's kit's instructions booklet, what signal is ultimately provided to wire a?");
}
