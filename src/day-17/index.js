import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 17: No Such Thing as Too Much";

export function getCombinations(list, target, partial = [], result = []) {
    const partialTotal = _.sum(partial);

    if (_.isEqual(partialTotal, target))
        result.push(partial);

    _.map((index) => {
        const value = list[index];
        const rest = list.slice(index + 1);

        getCombinations(rest, target, partial.concat(value), result);
    }, _.range(0, list.length));

    return result;
};

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const combinations = getCombinations(_.map(_.parseInt(10), input), 150);

    console.log("Filling all containers entirely, how many different combinations of containers can exactly fit all 150 liters of eggnog?", combinations.length);
}
