import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 3: Perfectly Spherical Houses in a Vacuum";

function split(delimiter) {
    return _.curry((str) => str.split(delimiter));
}

export function getDeliveredHouses(instructions) {
    
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("How many houses receive at least one present?", getDeliveredHouses(input));
}
