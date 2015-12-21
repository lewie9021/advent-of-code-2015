import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 14: Reindeer Olympics";

export function parse(input) {
    return _.map((sentence) => {
        const [name] = sentence.match(/[A-Z][a-z]+/);
        const [speed, flyTime, restTime] = _.map(_.parseInt(10), sentence.match(/\d+/g));
        
        return {name, speed, flyTime, restTime};
    }, input);
}

export function startRace(descriptions, duration) {
    if (!_.isArray(descriptions))
        throw new Error("You must provide an array of descriptions.");

    if (!_.isNumber(duration))
        throw new Error("You must provide duration time.");
    
    return _.map((description) => {
        const {name, distance, next} = reindeer(description);
        
        _.times(next, duration);
        
        return {
            name: name(),
            distance: distance()
        };
    }, descriptions);
}

export function reindeer(description) {
    if (!_.isPlainObject(description))
        throw new Error("You must provide a description object.");

    const {name, speed, flyTime, restTime} = description;
    let steps = 0;
    let distance = 0;

    return {
        name: () => name,
        distance: () => distance,
        next: () => {
            if (steps % (flyTime + restTime) < flyTime)
                distance += speed;

            steps += 1;
        }
    };
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("After exactly 2503 seconds, what distance has the winning reindeer traveled?");
}
