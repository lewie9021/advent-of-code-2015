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
    const width = grid[0].length;
    const height = grid.length;
    const add = ([xx, yy]) => [x + xx, y + yy];
    const withinGrid = ([xx, yy]) =>
              // Within Width
              _.gte(0, xx) && _.lt(width, xx) &&
              // Within Height
              _.gte(0, yy) && _.lt(height, yy);
    
    return _.compose(
        _.map(([xx, yy]) => grid[yy][xx]),
        _.filter(withinGrid),
        _.map(add),
        getDirections
    )();
}

export function animate(grid) {
    const width = grid[0].length;
    const height = grid.length;

    return _.map((y) => {
        return  _.map((x) => {
            const neighbours = getNeighbours(grid, [x, y]);
            const onCount = _.filter(_.isEqual("#"), neighbours).length;
            const currentState = grid[y][x];

            // A light which is on stays on when 3 neighbors are on.
            // A light which is off turns on if exactly 3 neighbors are on.
            if (onCount == 3)
                return "#";

            // A light which is on stays on when 2 neighbors are on.
            if (currentState == "#" && onCount == 2)
                return "#";

            // A light turns off / stays off otherwise.
            return ".";
        }, _.range(0, width));
    }, _.range(0, height));
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("Given your initial configuration, how many lights are on after 100 steps?");
}
