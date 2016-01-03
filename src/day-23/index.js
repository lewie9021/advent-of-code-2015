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
            nextRegisters: assign({
                [id]: registers[id] + 1
            }, registers, {}),
            nextPosition: position + 1
        };
    },
    "hlf": (registers, position, id) => {
        return {
            nextRegisters: assign({
                [id]: Math.floor(registers[id] / 2)
            }, registers, {}),
            nextPosition: position + 1
        };
    },
    "tpl": (registers, position, id) => {
        return {
            nextRegisters: assign({
                [id]: registers[id] * 3
            }, registers, {}),
            nextPosition: position + 1
        };
    },
    "jmp": (registers, position, value) => {
        return {
            nextRegisters: registers,
            nextPosition: position + parseInt(value, 10)
        };
    },
    "jie": (registers, position, id, value) => {
        return {
            nextRegisters: registers,
            nextPosition: position + (registers[id] % 2 ? 1 : parseInt(value, 10))
        };
    },
    "jio": (registers, position, id, value) => {
        return {
            nextRegisters: registers,
            nextPosition: position + (registers[id] != 1 ? 1 : parseInt(value, 10))
        };
    }
};

export function execute(instructions, initialRegisters = {a: 0, b: 0}) {
    const run = ({operator, operands}, registers, position = 0) => {
        const command = commands[operator];
        const {nextPosition, nextRegisters} = command(registers, position, ...operands);
        const instruction = instructions[nextPosition];

        if (!instruction)
            return nextRegisters;

        return run(instruction, nextRegisters, nextPosition);
    };

    return run(_.first(instructions), initialRegisters);
};

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    const instructions = parse(input);
    
    console.log("What is the value in register b when the program in your puzzle input is finished executing?", _.get("b", execute(instructions)));
}
