import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 9: All in a Single Night";

export function getLocations(distances) {
    const locations = _.compose(_.unique, _.map(_.get("from")));

    return _.reduce((map, location, index) => {
        map[index] = location;
        
        return map;
    }, {}, locations(distances));
}

export function getDistances(input) {
    const parse = (string) => {
        const [from,, to, value] = string.match(/(\w+|\d+)/g);
        const distance = parseInt(value);

        return [
            {from, to, distance},
            {from: to, to: from, distance}
        ];
    };
    const distances = _.compose(_.flatten, _.map(parse));

    return distances(input);
}

export function getRoutes(locationIDs, subRoute = [], result = []) {
    if (!locationIDs.length)
        return result.concat([subRoute]);

    // Loop through each ID and call getRoute with current value + rest.
    return _.reduce((routes, locationID) => {
        const rest = _.filter((id) => id !== locationID, locationIDs);

        // Append any complete routes to the returned value.
        return routes.concat(getRoutes(rest, subRoute.concat(locationID), result));
    }, result, locationIDs);
}

export function shortestDistance(input) {
    const distances = getDistances(input);
    const locations = getLocations(distances);
    const locationIDs = _.map((x) => parseInt(x, 10), Object.keys(locations));
    const routes = getRoutes(locationIDs);
    const totalDistances = _.map((route) => {
        return _.reduce((total, location, index) => {
            const from = locations[route[index]];
            const to = locations[route[index + 1]];

            if (!to)
                return total;

            const [match] = _.filter((x) => x.from  == from && x.to == to, distances);

            return total += match.distance;
        }, 0, route);
    }, routes);

    return _.first(totalDistances.sort());
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the distance of the shortest route?");
}
