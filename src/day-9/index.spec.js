import { expect } from "chai";
import { title, getRoutes, getLocations, shortestDistance } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        beforeEach(function() {
            this.distances = [
                "London to Dublin = 464",
                "London to Belfast = 518",
                "Dublin to Belfast = 141"
            ];
        });
        
        describe("getRoutes", function() {

            it("should return an array of routes", function() {
                const routes = getRoutes(this.distances);
                
                expect(Array.isArray(routes)).to.eq(true);
            });

            it("should duplicate the number of routes (there and back)", function() {
                const routes = getRoutes(this.distances);

                expect(routes.length).to.eq(this.distances.length * 2);
            });
            
        });

        describe("getLocations", function() {

            beforeEach(function() {
                this.routes = getRoutes(this.distances);
            });
            
            it("should return a map of unique locations", function() {
                const locations = getLocations(this.routes);
                
                expect(Object.keys(locations).length).to.eq(3);
                expect(locations).to.have.keys("London", "Dublin", "Belfast");
            });
            
        });

    });

});
