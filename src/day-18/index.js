import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split } from "../helpers";

export const title = "Day 18: Like a GIF For Your Yard";

export const parse = _.compose(_.map(split("")), split("\n"));

function getDirections() {
    const range = _.range(-1, 2);
    const directions = _.map((y) => {
        return _.map((x) => [x, y], range);
    }, range);

    return _.compose(
        _.filter(_.negate(_.isEqual([0, 0]))),
        _.flatten
    )(directions);
}

export function getNeighbours(grid, [x, y]) {
    const add = ([xx, yy]) => [x + xx, y + yy];
    const withinGrid = ([xx, yy]) =>
              // Within Width
              _.gte(0, xx) && _.lt(grid[0].length, xx) &&
              // Within Height
              _.gte(0, yy) && _.lt(grid.length, yy);
    
    return _.compose(
        _.map(([xx, yy]) => grid[yy][xx]),
        _.filter(withinGrid),
        _.map(add),
        getDirections
    )();
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("Given your initial configuration, how many lights are on after 100 steps?");
}
