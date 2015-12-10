import FS from "fs";
import Path from "path";
import _ from "lodash";

export const title = "Day 1: Not Quite Lisp";

const directions = {
    "(": 1,
    ")": -1
};

function get(x) {
    return _.curry((obj) => obj[x]);
}

function followInstructions(instructions) {
    let base = {
        position: null,
        floor: 0
    };
    
    return _.reduce(instructions, (details, instruction, index) => {
        const floor = details.floor + directions[instruction];
        const pos = (!details.position && floor < 0) ? index + 1 : details.position;
        
        return {floor, position: pos};
    }, base);
}

export function getFloor(instructions) {
    return _.compose(get("floor"), followInstructions, _.map)(instructions);
}

export function getBasement(instructions) {
    return _.compose(get("position"), followInstructions, _.map)(instructions);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const instructions = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("To what floor do the instructions take Santa?", getFloor(instructions));
    console.log("What is the position of the character that causes Santa to first enter the basement?", getBasement(instructions));
}
