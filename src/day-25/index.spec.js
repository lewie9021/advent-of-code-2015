import _ from "lodash-fp";
import { expect } from "chai";
import { title, parse, getCodeAt } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {

            it("should return an array of numeric values", function() {
                const input = [
                    "A: 1",
                    "B: 2",
                    "C: 3"
                ].join("\n");
                const result = parse(input);
                
                expect(result).to.be.an("array");
            });

            it("should return an array of length equal to input line count", function() {
                const input = [
                    "A: 54",
                    "B: 25",
                    "C: 1"
                ];
                const result = parse(input.join("\n"));
                
                expect(result.length).to.eq(input.length);
            });
            
            it("should grab the value at the end of each line", function() {
                const inputs = [
                    ["A: 32", "B: 45", "C: 123"],
                    ["A: 65", "B: 21", "C: 5"],
                    ["A: 99", "B: 84", "C: 34"]
                ];
                const expectations = [
                    [32, 45, 123],
                    [65, 21, 5],
                    [99, 84, 34]
                ];

                _.forEach((input, index) => {
                    const result = parse(input.join("\n"));
                    
                    expect(result).to.eql(expectations[index]);
                }, inputs);
            });
            
        });
        
        describe("getCodeAt", function() {

            it("should return 20151125, given x: 1, y: 1", function() {
                const result = getCodeAt(1, 1);

                expect(result).to.eq(20151125);
            });

            it("should return 31916031, given x: 1, y: 2", function() {
                const result = getCodeAt(1, 2);

                expect(result).to.eq(31916031);
            });

            it("should return 18749137, given x: 2, y: 1", function() {
                const result = getCodeAt(1, 2);

                expect(result).to.eq(18749137);
            });

            it("should return 1601130, given x: 3, y: 3", function() {
                const result = getCodeAt(1, 2);

                expect(result).to.eq(1601130);
            });

            it("should return 28094349, given x: 3, y: 5", function() {
                const result = getCodeAt(1, 2);

                expect(result).to.eq(28094349);
            });

        });

    });

});
