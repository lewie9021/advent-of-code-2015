import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 19: Medicine for Rudolph";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("How many distinct molecules can be created after all the different ways you can do one replacement on the medicine molecule?");
}
