import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 13: Knights of the Dinner Table";

function getGuests(list) {
    const guests = _.compose(_.unique, _.map(_.get("guest")));

    return _.reduce((map, guest, index) => {
        map[index] = guest;
        
        return map;
    }, {}, guests(list));
}

export function getSeating(guestIDs, subSeating = [], result = []) {
    if (!guestIDs.length)
        return result.concat([subSeating]);

    // Loop through each ID and call getSeating with current value + rest.
    return _.reduce((seating, guestID) => {
        const rest = _.filter((id) => id !== guestID, guestIDs);

        // Append any complete seating arrangements to the returned value.
        return seating.concat(getSeating(rest, subSeating.concat(guestID), result));
    }, result, guestIDs);
}

function warpValue(value, max) {
   return ((value % max) + max) % max;
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
                return guests[arrangement[warpValue(index + offset, 4)]];
            }, [-1, 0, 1]);
            // Looks through the list to find the matching guest and neighbour.
            const findInList = _.curry((x, a, b) => {
                return _.filter(({guest, neighbour}) => guest == a && neighbour == b, x);
            });
            const getValue = _.compose(_.get("value"), _.first, findInList(list, current));
            
            return total + (getValue(left) + getValue(right));
        }, 0, arrangement);
    }, arrangements);
    
    return _.last(cost.sort());
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim().split("\n");
    
    console.log("What is the total change in happiness for the optimal seating arrangement?");
}
