import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 21: RPG Simulator 20XX";

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the least amount of gold you can spend and still win the fight?");
}
