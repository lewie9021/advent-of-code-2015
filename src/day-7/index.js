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

function wrapValue(value, max) {
   return ((value % max) + max) % max;
}

export function execute(baseScope, instruction) {
    const scope = _.clone(baseScope);
    const [operation, identifier] = _.map(_.trim, split("->", instruction));
    const constant = parseInt(operation, 10);

    // Get the operator function.
    const pattern = new RegExp(`(${Object.keys(operators).join("|")})`, "g");
    const match = operation.match(pattern);

    // Here, 'operation' is either a constant or an identifier.
    if (!match) {
        scope[identifier] = wrapValue(lookupValues(scope, operation)[0], maxValue);
        
        return scope;
    }
    
    const [name] = match;
    const operator = operators[name];
    
    // Parse the values so we are working with constants.
    const values = lookupValues(scope, operation.replace(name, ""));

    // Pass the values to the operator and create / update the value in scope.
    scope[identifier] = wrapValue(operator(...values), maxValue);

    return scope;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    let scope = {};

    // Build up the scope object through each instruction.
    input.forEach((x) => scope = execute(scope, x));
    
    console.log("In little Bobby's kit's instructions booklet, what signal is ultimately provided to wire a?", scope["a"]);
}
