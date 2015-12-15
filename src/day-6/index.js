import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split, fill } from "../helpers";

export const title = "Day 6: Probably a Fire Hazard";

export function createGrid(width, height, value = 0) {
    let rows = fill(value, Array(height));
    const columns = () => fill(value, Array(width));

    return _.map(columns, rows);
}

function parse(instruction) {
    const toIntegers = _.compose(_.map(_.parseInt(10)), split(","));
    const [mode, pointA, pointB] = instruction.match(/(on|off|toggle)|(\d+),(\d+)/g);
    
    return {
        mode,
        pointA: toIntegers(pointA),
        pointB: toIntegers(pointB)
    };
}

const modes = {
    "on": () => 1,
    "off": () => 0,
    "toggle": (x) => !x
};

export function configureLighting(grid, instructions) {
    const {mode, pointA, pointB} = parse(instructions);
    const operation = modes[mode];
    const [x1, y1] = pointA;
    const [x2, y2] = pointB;
    const columns = _.range(x1, x2 + 1);
    const rows = _.range(y1, y2 + 1);
    
    _.map((y) => {
        _.map((x) => {
              grid[x][y] = operation(grid[x][y]);
        }, columns);
    }, rows);

    return grid;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("After following the instructions, how many lights are lit?");
}
