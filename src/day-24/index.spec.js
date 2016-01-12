import { expect } from "chai";
import { title, parse, getQuantumEntanglement } from "./";
import _ from "lodash-fp";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {
            
            it("should return a list of numbers", function() {
                const input = ["15", "0", "123", "44", "32"].join("\n");
                const result = parse(input);

                expect(result).to.be.an("array");

                _.forEach((x) => expect(x).to.be.a("number"));
            });

            it("should return [1, 2, 3, 4], given '1\\n2\\n3\\n4'", function() {
                const input = ["1", "2", "3", "4"].join("\n");
                const result = parse(input);
                
                expect(result).to.eql([1, 2, 3, 4]);
            });
            
        });

        describe("getCombinations", function() {

            it("should work", function() {
                
            });
            
        });
        
        describe("getQuantumEntanglement", function() {

            it("should return 99, given the values [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]", function() {
                const values = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
                const result = getQuantumEntanglement(values);

                expect(result).to.eq(99);
            });
            
        });

    });

});
