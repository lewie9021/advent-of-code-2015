import FS from "fs";
import Path from "path";
import _ from "lodash-fp";

export const title = "Day 9: All in a Single Night";

export function getLocations(routes) {
    const locations = _.compose(_.unique, _.map(_.get("from")));

    return _.reduce((map, route, index) => {
        map[route] = index;
        
        return map;
    }, {}, locations(routes));
}

export function getRoutes(distances) {
    const route = (string) => {
        const values = string
                  .replace("to", "")
                  .match(/(\w+|\d+)/g);
        const distance = parseInt(values[2]);

        return [
            {from: values[0], to: values[1], distance},
            {from: values[1], to: values[0], distance}
        ];
    };
    const routes = _.compose(_.flatten, _.map(route));

    return routes(distances);
}

export function shortestDistance(distances) {
    const routes = getRoutes(distances);
    const locations = getLocations(routes);
}

export function run() {
    const inputPath = Path.join(__dirname, "input.txt");
    const input = FS.readFileSync(inputPath, "utf-8").trim();
    
    console.log("What is the distance of the shortest route?");
}
