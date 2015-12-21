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

export function race(descriptions, duration) {
    if (!_.isArray(descriptions))
        throw new Error("You must provide an array of descriptions.");

    if (!_.isNumber(duration))
        throw new Error("You must provide duration time.");

    const participants = _.map(reindeer, descriptions);
    
    _.times((second) => {
        _.forEach((x) => x.next(), participants);

        const furthest =  _.max(_.map((x) => x.distance(), participants));
        const leaders = _.filter(({distance}) => _.isEqual(distance(), furthest), participants);
        
        _.forEach((x) => x.award(), leaders);
    }, duration);

    return _.map(({name, distance, score}) => ({
        name: name(),
        distance: distance(),
        score: score()
    }), participants);
}

export function reindeer(description) {
    if (!_.isPlainObject(description))
        throw new Error("You must provide a description object.");

    const {name, speed, flyTime, restTime} = description;
    let steps = 0;
    let distance = 0;
    let score = 0;

    return {
        name: () => name,
        distance: () => distance,
        score: () => score,
        award: () => score += 1,
        next: () => {
            if (steps % (flyTime + restTime) < flyTime)
                distance += speed;

            steps += 1;
        }
    };
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const descriptions = parse(input);
    const furthest = _.compose(_.get("distance"), _.last, _.sortBy("distance"));
    const bestScore = _.compose(_.get("score"), _.last, _.sortBy("score"));
    
    console.log("After exactly 2503 seconds, what distance has the winning reindeer traveled?", furthest(race(descriptions, 2503)));
    console.log("After exactly 2503 seconds, how many points does the winning reindeer have?", bestScore(race(descriptions, 2503)));
}
