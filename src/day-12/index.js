import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 12: JSAbacusFramework.io";

function visit(node) {
    if (_.isArray(node))
        return _.map((x) => visit(x), node);

    if (_.isObject(node))
        return _.map((k) => visit(node[k]), Object.keys(node));
    
    return node;
}

function reduceDeep(collection, func, start) {
    const values = _.flattenDeep(visit(collection));
    let value = start;

    for (let i = 0; i < values.length; i += 1) {
        value = func(value, values[i], i, values);
    }
    
    return value;
}

export function total(collection) {
    return reduceDeep(collection, _.add, 0);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.json");
    const input = JSON.parse(FS.readFileSync(inputPath, "utf-8"));
    
    console.log("What is the sum of all numbers in the document?", total(input));
}
