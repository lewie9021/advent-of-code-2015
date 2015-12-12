import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split } from "../helpers";

export const title = "Day 2: I Was Told There Would Be No Math";

const parse =  _.compose(_.map(_.parseInt(10)), split("x"));

export function getWrappingFootage(measurements) {   
    const [length, width, height] = parse(measurements);

    // Do some math...
    const surfaceArea = (2 * length * width) + (2 * width * height) + (2 * height * length);
    const smallestSide = Math.min(width * height, length * height, width * length);

    // Total surface area + the area of the smallest side.
    return surfaceArea + smallestSide;
}

export function getRibbonFootage(measurements) {
    const [length, width, height] = parse(measurements);

    // Do some math...
    const smallestSide = Math.min(width + height, length + height, width + length);
    const volume = length * width * height;

    // Perimeter of the smallest side + cubic volume.
    return (smallestSide * 2) + volume;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const sum = _.compose(_.reduce(_.add, 0));
    const totalWrappingPaper = _.compose(sum, _.map(getWrappingFootage));
    const totalRibbon = _.compose(sum, _.map(getRibbonFootage));
    
    console.log("All numbers in the elves' list are in feet. How many total square feet of wrapping paper should they order?", totalWrappingPaper(input));
    console.log("How many total feet of ribbon should they order?", totalRibbon(input));
}
