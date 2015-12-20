import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 12: JSAbacusFramework.io";

function visit(node, customizer = _.constant(true)) {
    if (!customizer(node))
        return 0;

    if (_.isArray(node))
        return _.map((x) => visit(x, customizer), node);

    if (_.isObject(node))
        return _.map((k) => visit(node[k], customizer), Object.keys(node));
    
    return node;
}

function reduceDeep(collection, func, start, customizer) {
    const values = _.flattenDeep(visit(collection, customizer));
    let value = start;

    for (let i = 0; i < values.length; i += 1) {
        value = func(value, values[i], i, values);
    }
    
    return value;
}

export function total(collection, customizer) {
    return reduceDeep(collection, _.add, 0, customizer);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.json");
    const input = JSON.parse(FS.readFileSync(inputPath, "utf-8"));
    const customizer = (node) => {
        if (_.isPlainObject(node))
            return !_.includes("red", node);
        
        return true;
    };
    
    console.log("What's the sum of all the numbers?", total(input));
    console.log("What's the sum of all numbers (ignoring object nodes with the value 'red')?", total(input, customizer));
}
