import FS from "fs";
import Path from "path";
import _ from "lodash-fp";
import { warpValue } from "../helpers";

export const title = "Day 13: Knights of the Dinner Table";

function getGuests(list) {
    const guests = _.compose(_.unique, _.map(_.get("guest")));

    return _.reduce((map, guest, index) => {
        map[index] = guest;
        
        return map;
    }, {}, guests(list));
}

function getSeating(guestIDs, subSeating = [], result = []) {
    if (!guestIDs.length)
        return result.concat([subSeating]);

    // Loop through each ID and call getSeating with current value + rest.
    return _.reduce((seating, guestID) => {
        const rest = _.filter((id) => id !== guestID, guestIDs);

        // Append any complete seating arrangements to the returned value.
        return seating.concat(getSeating(rest, subSeating.concat(guestID), result));
    }, result, guestIDs);
}

function getMyHappiness(name, list) {
    const guests = getGuests(list);
    const happiness = _.map((guest) => [
        `${guest} would gain 0 happiness units by sitting next to ${name}`,
        `${name} would gain 0 happiness units by sitting next to ${guest}`
    ], guests);

    return _.flatten(happiness);
}

export function parse(input) {
    return _.map((sentence) => {
        const [guest, neighbour] = sentence.match(/[A-Z]{1}[a-z]+/g);
        const [adjustment, value] = sentence.match(/(gain|lose)|(\d+)/g);
        const happiness = value * (adjustment == "gain" ? 1 : -1);

        return {
            guest,
            neighbour,
            value: happiness
        };
    }, input);
}

export function calculateSeating(list) {
    const guests = getGuests(list);
    const guestIDs = _.map((x) => parseInt(x, 10), Object.keys(guests));
    const arrangements = getSeating(guestIDs);
    
    // Calculate the total cost of each arrangement.
    const cost = _.map((arrangement) => {
        return _.reduce((total, guest, index) => {
            // Get an array of people (left, current, and right).
            const [left, current, right] = _.map((offset) => {
                return guests[arrangement[warpValue(index + offset, guestIDs.length)]];
            }, [-1, 0, 1]);
            // Looks through the list to find the matching guest and neighbour.
            const findInList = _.curry((x, a, b) => {
                return _.filter(({guest, neighbour}) => guest == a && neighbour == b, x);
            });
            const getValue = _.compose(_.get("value"), _.first, findInList(list, current));
            
            return total + (getValue(left) + getValue(right));
        }, 0, arrangement);
    }, arrangements);

    return _.last(cost.sort((a,b) => a - b));
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    const list = parse(input);
    const listWithMe = parse(input.concat(getMyHappiness("Lewis", list)));

    console.log("What's the total change in happiness for the optimal seating arrangement?", calculateSeating(list));
    console.log("What's the total change in happiness for the optimal seating arrangement that actually includes yourself?", calculateSeating(listWithMe));
}
