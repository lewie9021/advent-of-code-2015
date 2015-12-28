import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 19: Medicine for Rudolph";

export function parse(input) {
    return {
        replacements: _.map((str) => {
            const [key, value] = str.split(" => ");
            
            return {key, value};
        }, _.take(input.length - 2, input)),
        molecule: _.last(input)
    };
}

export function getDistinctMolecules() {
    
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("How many distinct molecules can be created after all the different ways you can do one replacement on the medicine molecule?");
}
