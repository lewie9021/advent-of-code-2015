import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 18: Like a GIF For Your Yard";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("Given your initial configuration, how many lights are on after 100 steps?");
}
