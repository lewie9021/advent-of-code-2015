import { expect } from "chai";
import { title, getDistances, getLocations, shortestDistance } from "./";

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
                expect(locations).to.have.keys("London", "Dublin", "Belfast");
            });
            
        });

    });

});
