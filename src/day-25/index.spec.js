import _ from "lodash-fp";
import { expect } from "chai";
import { title, parse, getCodeAt } from "./";

describe(title, function() {

    describe("parse", function() {

        it("should return an array of numeric values", function() {
            const input = "Enter the code at row 2, column 3.";
            const result = parse(input);
            
            expect(result).to.be.an("array");
        });

        it("should return an array of length equal to numerical values", function() {
            const input = "Enter the code at row 123, column 456.";
            const result = parse(input);
            
            expect(result.length).to.eq(2);
        });
        
        it("should grab the value at the end of each line", function() {
            const inputs = [
                "Enter the code at row 32, column 45.",
                "Enter the code at row 65, column 21.",
                "Enter the code at row 99, column 123."
            ];
            const expectations = [
                [32, 45],
                [65, 21],
                [99, 123]
            ];

            _.forEach((input, index) => {
                const result = parse(input);
                
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
            const result = getCodeAt(2, 1);

            expect(result).to.eq(18749137);
        });

        it("should return 1601130, given x: 3, y: 3", function() {
            const result = getCodeAt(3, 3);

            expect(result).to.eq(1601130);
        });

        it("should return 28094349, given x: 3, y: 5", function() {
            const result = getCodeAt(3, 5);

            expect(result).to.eq(28094349);
        });

    });

});
