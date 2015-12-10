import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 2: I Was Told There Would Be No Math";

function split(delimiter) {
    return _.curry((str) => str.split(delimiter));
}

export function getSquareFootage(measurements) {
    const parse = _.compose(_.map(_.parseInt(10)), split("x"));
    const [length, width, height] = parse(measurements);

    // Do some math...
    const surfaceArea = (2 * length * width) + (2 * width * height) + (2 * height * length);
    const smallestSide = Math.min(width * height, length * height, width * length);

    // Total surface area + the area of the smallest side.
    return surfaceArea + smallestSide;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const measurements = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("All numbers in the elves' list are in feet. How many total square feet of wrapping paper should they order?");
}
