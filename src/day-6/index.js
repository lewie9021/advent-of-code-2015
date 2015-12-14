import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 6: Probably a Fire Hazard";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("After following the instructions, how many lights are lit?");
}
