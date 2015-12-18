import _ from "lodash-fp";
import { expect } from "chai";
import {
    title,
    getDistances,
    getLocations,
    getRoutes,
    calculateDistances,
    longestDistance,
    shortestDistance
} from "./";

describe(title, function() {

    describe("Part 1:", function() {

        beforeEach(function() {
            this.input = [
                "London to Dublin = 464",
                "London to Belfast = 518",
                "Dublin to Belfast = 141"
            ];
        });
        
        describe("getDistances", function() {

            it("should return an array of routes", function() {
                const routes = getDistances(this.input);
                
                expect(Array.isArray(routes)).to.eq(true);
            });

            it("should duplicate the number of routes (there and back)", function() {
                const routes = getDistances(this.input);

                expect(routes.length).to.eq(this.input.length * 2);
            });
            
        });

        describe("getLocations", function() {

            beforeEach(function() {
                this.distances = getDistances(this.input);
            });
            
            it("should return a map of unique locations", function() {
                const locations = getLocations(this.distances);
                
                expect(Object.keys(locations).length).to.eq(3);
                expect(locations).to.have.keys("0", "1", "2");
                expect(locations[0]).to.eq("London");
                expect(locations[1]).to.eq("Dublin");
                expect(locations[2]).to.eq("Belfast");
            });
            
        });

        describe("getRoutes", function() {

            beforeEach(function() {
                this.distances = getDistances(this.input);
                this.locations = getLocations(this.distances);
            });
            
            it("should return an array of combinations without repetition", function() {
                const locationIDs = _.map((x) => parseInt(x, 10), Object.keys(this.locations));
                const routes = getRoutes(locationIDs);
                function findRoute(routes, values) {
                    return _.filter((route) => _.isEqual(values, route), routes);
                }

                // Ensure we have the correct amount of routes.
                expect(routes.length).to.eq(6);

                // London -> Dublin -> Belfast
                expect(findRoute(routes, [0, 1, 2]).length).to.eq(1);
                // London -> Belfast -> Dublin
                expect(findRoute(routes, [0, 2, 1]).length).to.eq(1);
                // Dublin -> London -> Belfast
                expect(findRoute(routes, [1, 0, 2]).length).to.eq(1);
                // Dublin -> Belfast -> London
                expect(findRoute(routes, [1, 2, 0]).length).to.eq(1);
                // Belfast -> London -> Dublin
                expect(findRoute(routes, [2, 0, 1]).length).to.eq(1);
                // Belfast -> Dublin -> London
                expect(findRoute(routes, [2, 1, 0]).length).to.eq(1);
            });
            
        });

        describe("calculateDistances", function() {

            it("should return an array of distances", function() {
                const distances = calculateDistances(this.input);
                
                expect(distances).to.eql([
                    // London -> Dublin -> Belfast
                    605,
                    // London -> Belfast -> Dublin
                    659,
                    // Dublin -> London -> Belfast
                    982,
                    // Dublin -> Belfast -> London
                    659,
                    // Belfast -> London -> Dublin
                    982,
                    // Belfast -> Dublin -> London
                    605
                ]);
            });
            
        });

        describe("shortestDistance", function() {
            
            it("should return the shortest distance", function() {
                const result = shortestDistance(this.input);

                expect(result).to.eq(605);
            });
            
        });

        describe("longestDistance", function() {
            
            it("should return the longest distance", function() {
                const result = longestDistance(this.input);

                expect(result).to.eq(982);
            });
            
        });

    });

});
