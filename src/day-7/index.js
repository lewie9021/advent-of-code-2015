import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { split } from "../helpers";

export const title = "Day 7: Some Assembly Required";

export function execute(baseScope, instruction) {
    const scope = _.clone(baseScope);
    const [operation, identifier] = _.map(_.trim, split("->", instruction));
    const constant = parseInt(operation, 10);

    // It's a simple value assignment.
    if (!isNaN(constant)) {
        scope[identifier] = parseInt(operation, 10);

        return scope;
    }

    return scope;
}


export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("In little Bobby's kit's instructions booklet, what signal is ultimately provided to wire a?");
}
