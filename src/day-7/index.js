import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split } from "../helpers";

export const title = "Day 7: Some Assembly Required";

const operators = {
    "AND": (x, y) => x & y,
    "OR": (x, y) => x | y,
    "LSHIFT": (x, y) => x << y,
    "RSHIFT": (x, y) => x >> y,
    "NOT": (x) => ~x
};

function lookupValues(scope, values) {
    return values
        .match(/([A-Z]+)|([0-9]+)/gi)
        .map((x) => {
            const value = parseInt(x, 10);
            return (isNaN(value)) ? scope[x] : value;
        });
}

const maxValue = Math.pow(2, 16);

function warpValue(value, max) {
   return ((value % max) + max) % max;
}

export function execute(baseScope, instruction) {
    const scope = _.clone(baseScope);
    const [operation, identifier] = _.map(_.trim, split("->", instruction));
    const values = _.map((value) => {
        const constant = parseInt(value, 10);
        
        if (!isNaN(constant))
            return constant;

        if (!scope.hasOwnProperty(value))
            throw new Error(`${value} is not defined`);
        
        return scope[value];
    }, operation.match(/([a-z]+)|([0-9]+)/g) || []);
    const operatorName = operation.match(/[A-Z]+/);

    if (!operatorName) {
        scope[identifier] = values[0];

        return scope;
    }

    const operator = operators[operatorName[0]];
    
    scope[identifier] = warpValue(operator(...values), maxValue);
    
    return scope;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    let input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    let scope = {};

    // Build up the scope object through each instruction.
    while (input.length) {
        const instruction = input.shift();

        try {
            scope = execute(scope, instruction);
        } catch(e) {
            input.push(instruction);
        };
    }
    
    console.log("In little Bobby's kit's instructions booklet, what signal is ultimately provided to wire a?", scope["a"]);
}
