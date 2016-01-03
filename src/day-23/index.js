import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split, match } from "../helpers";

export const title = "Day 23: Opening the Turing Lock";

export const parse = _.compose(
    _.map(([operator, ...operands]) => ({
        operator,
        operands
    })),
    _.map(match(/[+|-]?\w+/g)),
    split("\n")
);

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the value in register b when the program in your puzzle input is finished executing?");
}
