import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split, fill } from "../helpers";

export const title = "Day 6: Probably a Fire Hazard";

export function createGrid(width, height, value = false) {
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

export function configureLighting(grid, modes, instructions) {
    const {mode, pointA, pointB} = parse(instructions);
    const operation = modes[mode];
    const [x1, y1] = pointA;
    const [x2, y2] = pointB;
    const columns = _.range(x1, x2 + 1);
    const rows = _.range(y1, y2 + 1);
    
    _.map((y) => {
        _.map((x) => {
              grid[y][x] = operation(grid[y][x]);
        }, columns);
    }, rows);

    return grid;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const total = _.compose(_.sum, _.map(_.sum));

    
    const grid = createGrid(1000, 1000);
    const modes = {
        "on": () => true,
        "off": () => false,
        "toggle": (x) => !x
    };
    
    const grid2 = createGrid(1000, 1000);
    const modes2 = {
        "on": (x) => x + 1,
            "off": (x) => Math.max(0, x - 1),
            "toggle": (x) => x + 2
    };

    input.forEach((instructions) => {
        configureLighting(grid, modes, instructions);
        configureLighting(grid2, modes2, instructions);
    });
    
    console.log("After following the instructions, how many lights are lit?", total(grid));
    console.log("What is the total brightness of all lights combined after following Santa's instructions?", total(grid2));
}
