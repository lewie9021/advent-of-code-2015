import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 13: Knights of the Dinner Table";

export function calculateSeating() {
    
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("What is the total change in happiness for the optimal seating arrangement?");
}
