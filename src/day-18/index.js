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

function getCorners(grid) {
    const right = grid[0].length - 1;
    const bottom = grid.length - 1;
    
    return [
        [0, 0],
        [right, 0],
        [right, bottom],
        [0, bottom]
    ];
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

export function animate(grid, determineState) {
    const width = grid[0].length;
    const height = grid.length;

    return _.map((y) => {
        return  _.map((x) => {
            return determineState(x, y, grid);
        }, _.range(0, width));
    }, _.range(0, height));
}

export function stateRules(x, y, grid) {
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
}

export function stateRules2(x, y, grid) {
    // Check the coordinate isn't a corner.
    if (_.some(_.isEqual([x, y]), getCorners(grid)))
        return "#";

    // Fallback to the rules set by stateRules.
    return stateRules(...arguments);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    const onCount = _.compose(_.get("length"), _.filter(_.isEqual("#")), _.flatten);
    const runAnimation = (initialState, rules, times) => {
        return _.reduce((grid) => animate(grid, rules), initialState, _.range(0, times));
    };
    const initialState = parse(input);
    const initialState2 = (() => {
        let grid = parse(input);

        // Turn all corners on.
        _.map(([x, y]) => {
            grid[y][x] = "#";
        }, getCorners(grid));
        
        return grid;
    })();
    
    console.log("Given your initial configuration, how many lights are on after 100 steps?", onCount(runAnimation(initialState, stateRules, 100)));
    console.log("Given your initial configuration, but with the four corners always in the on state, how many lights are on after 100 steps?", onCount(runAnimation(initialState2, stateRules2, 100)));
}
