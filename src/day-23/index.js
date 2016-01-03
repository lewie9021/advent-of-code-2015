import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split, match, assign } from "../helpers";

export const title = "Day 23: Opening the Turing Lock";

export const parse = _.compose(
    _.map(([operator, ...operands]) => ({
        operator,
        operands
    })),
    _.map(match(/[+|-]?\w+/g)),
    split("\n")
);

const commands = {
    "inc": (registers, position, id) => {
        return {
            registers: assign({
                [id]: registers[id] + 1
            }, registers, {}),
            position: position + 1
        };
    },
    "hlf": (registers, position, id) => {
        return {
            registers: assign({
                [id]: Math.floor(registers[id] / 2)
            }, registers, {}),
            position: position + 1
        };
    },
    "tpl": (registers, position, id) => {
        return {
            registers: assign({
                [id]: registers[id] * 3
            }, registers, {}),
            position: position + 1
        };
    },
    "jmp": (registers, position, value) => {
        return {
            registers,
            position: position + parseInt(value, 10)
        };
    },
    "jie": (registers, position, id, value) => {
        return {
            registers,
            position: position + (registers[id] % 2 ? 1 : parseInt(value, 10))
        };
    },
    "jio": (registers, position, id, value) => {
        return {
            registers,
            position: position + (registers[id] != 1 ? 1 : parseInt(value, 10))
        };
    }
};

export function execute(instructions) {
    const run = ({operator, operands}, currentRegisters, currentPosition = 0) => {
        const command = commands[operator];
        const {position, registers} = command(currentRegisters, currentPosition, ...operands);
        const instruction = instructions[position];

        if (!instruction)
            return registers;

        return run(instruction, registers, position);
    };
    
    return run(_.first(instructions), {a: 0, b: 0});
};

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the value in register b when the program in your puzzle input is finished executing?");
}
