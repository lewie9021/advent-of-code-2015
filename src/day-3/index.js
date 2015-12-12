import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 3: Perfectly Spherical Houses in a Vacuum";

function split(delimiter) {
    return _.curry((str) => str.split(delimiter));
}

const directions = {
    ">": [1, 0],
    "<": [-1, 0],
    "v": [0, 1],
    "^": [0, -1]
};

export function getDeliveredHouses(instructions) {
    const navigate = _.reduce((tracking, instruction) => {
        const [x, y] = directions[instruction];
        const xx = tracking.x + x;
        const yy = tracking.y + y;
        
        return {
            houses: Object.assign({}, tracking.houses, {
                [`${xx}-${yy}`]: null
            }),
            x: xx,
            y: yy
        };
    }, {houses: {"0-0": null}, x: 0, y: 0});
    const total = _.compose(_.get("length"), Object.keys, _.get("houses"));
    const deliver = _.compose(total, navigate, split(""));
    
    return deliver(instructions);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("How many houses receive at least one present?", getDeliveredHouses(input));
}
