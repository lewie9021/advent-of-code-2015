import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { fill } from "../helpers";

export const title = "Day 6: Probably a Fire Hazard";

function createGrid(width, height, value = 0) {
    let columns = fill(value, Array(width));
    let rows = () => fill(value, Array(height));
    
    return _.map(rows, columns);
}

export function configureLighting(instruction) {
    
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("After following the instructions, how many lights are lit?");
}
