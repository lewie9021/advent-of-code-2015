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
    const getMolecules = ({key, value}) => {
        return _.map((index) => {
            const left = molecule.slice(0, index);
            const right = molecule.slice(index + key.length, molecule.length);
            
            return `${left}${value}${right}`;
        }, getMatchIndexes(key, molecule));
    };

    return _.compose(
        _.unique,
        _.flatten,
        _.map(getMolecules)
    )(replacements);
}

export function fabricateMolecule(start, target, replacements) {
    const findTarget = (value, target, count = 1) => {
        const molecules = _.filter((x) => x.length <= target.length, getDistinctMolecules(value, replacements));
        
        if (!molecules.length)
            return null;
        
        if (_.includes(target, molecules))
            return count + 1;

        const values = _.compact(_.map((value) => {
            return findTarget(value, target, count + 1);
        }, molecules));

        return (values.length) ? _.min(values) : null;
    };

    const seeds = _.filter(({key}) => key == start, replacements);
    const values = _.compact(_.map(({key, value}) => {
        return findTarget(value, target);
    }, seeds));

    return _.min(values);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const {molecule, replacements} = parse(input);
    const count = getDistinctMolecules(molecule, replacements).length;
    
    console.log("How many distinct molecules can be created after all the different ways you can do one replacement on the medicine molecule?", count);
}
