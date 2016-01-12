import { expect } from "chai";
import { title, parse, getCombinations, getQuantumEntanglement } from "./";
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

            it("should return an empty array, given values: []", function() {
                const result = getCombinations([], 5);

                expect(result).to.eql([]);
            });

            it("should return one combination, given values: [5] and target: 5", function() {
                const result = getCombinations([5], 5);

                expect(result).to.eql([[5]]);
            });

            it("should return three combinations, given values: [1, 2, 3, 4, 5] and target: 5", function() {
                const result = getCombinations([1, 2, 3, 4, 5], 5);

                expect(result).to.eql([
                    [1, 4],
                    [2, 3],
                    [5]
                ]);
            });

            it("should return one combination, given values: [1, 2, 3, 4, 5], target: 5, and limit: 1", function() {
                const result = getCombinations([1, 2, 3, 4, 5], 5, 1);
                
                expect(result).to.eql([[5]]);
            });

        });
        
        describe("getQuantumEntanglement", function() {

            it("should return 99, given values: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11] and groups: 3", function() {
                const values = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
                const result = getQuantumEntanglement(values, 3);

                expect(result).to.eq(99);
            });
            
        });

    });

    describe("Part 2:", function() {

        describe("getQuantumEntanglement", function() {

            it("should return 44, given values: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11] and groups: 4", function() {
                const values = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
                const result = getQuantumEntanglement(values, 4);

                expect(result).to.eq(44);
            });
            
        });
        
    });

});
