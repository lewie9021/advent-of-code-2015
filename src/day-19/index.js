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

function getMatchIndexes(partial, string) {
    const pattern = new RegExp(partial, "g");
    let array = [];

    while (pattern.exec(string)) {
        array.push(pattern.lastIndex - partial.length);
    }

    return array;
}

export function getDistinctMolecules(molecule, replacements) {
    const molecules = _.reduce((molecules, {key, value}) => {
        _.map((index) => {
            const left = molecule.substring(0, index);
            const right = molecule.substring(index + key.length);
            
            molecules[`${left}${value}${right}`] = null;
        }, getMatchIndexes(key, molecule));

        return molecules;
    }, {}, replacements);
    
    return Object.keys(molecules);
}

export function fabricateMolecule(start, target, replacements) {
    // Switch round the properties.
    replacements = _.map(({key, value}) => ({key: value, value: key}), replacements);
    
    const seeds = _.filter(({value}) => value == start, replacements);
    const findStart = (molecules, count = 0) => {
        return _.reduce((steps, molecule) => {
            if (steps.length)
                return steps;

            if (molecule == start)
                return steps.concat(count);
            
            const transformed = getDistinctMolecules(molecule, replacements);

            return steps.concat(findStart(transformed, count + 1));
        }, [], molecules);
    };
    const values = findStart([target]);

    return (values.length) ? _.min(values) : null;
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const {molecule, replacements} = parse(input);
    
    console.log("How many distinct molecules can be created after all the different ways you can do one replacement on the medicine molecule?", getDistinctMolecules(molecule, replacements).length);
    console.log("What is the fewest number of steps to go from e to the medicine molecule?", fabricateMolecule("e", molecule, replacements));
}
