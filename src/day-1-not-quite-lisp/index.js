import FS from "fs";
import Path from "path";
import _ from "lodash";

export const title = "Day 1: Not Quite Lisp";

function countValue(x) {   
    return _.curry((arr) => _.filter(arr, (value) => value == x));
}

export function getFloor(instructions) {
    const get = (x) => _.curry((chars) => chars[x]);
    const count = (character) =>  _.compose(get("length"), countValue(character), _.map)(instructions);

    const up = count("(");
    const down = count(")") * -1;
    
    return up + down;
}

export function atBasement(instructions) {
    
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const instructions = FS.readFileSync(inputPath, "utf-8");
    
    console.log("To what floor do the instructions take Santa?", FloorCalculator(instructions));
}
