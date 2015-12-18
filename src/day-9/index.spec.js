import { expect } from "chai";
import { title, getDistances, getLocations, getRoutes, shortestDistance } from "./";

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
            
            it("should return an array of permutations without repetition", function() {
                const locationIDs = Object.keys(this.locations);
                const routes = getRoutes(locationIDs);

                expect(routes.length).to.eq(6);

                // London -> Dublin -> Belfast
                expect(routes).to.contain([0, 1, 2]);
                // London -> Belfast -> Dublin
                expect(routes).to.contain([0, 2, 1]);
                // Dublin -> London -> Belfast
                expect(routes).to.contain([1, 0, 2]);
                // Dublin -> Belfast -> London
                expect(routes).to.contain([1, 2, 0]);
                // Belfast -> London -> Dublin
                expect(routes).to.contain([2, 0, 1]);
                // Belfast -> Dublin -> London
                expect(routes).to.contain([2, 1, 0]);
            });
            
        });

    });

});
