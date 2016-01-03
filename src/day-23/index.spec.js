import { expect } from "chai";
import { title, parse } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {

            it("should return an array of instructions", function() {
                const input = [
                    "inc a",
                    "hlf a"
                ].join("\n");
                
                expect(parse(input)).to.be.an("array");
            });

            it("should return objects with properties: 'operator' and 'operands'", function() {
                const input = [
                    "inc a",
                    "hlf a"
                ].join("\n");
                const result = parse(input);

                expect(result.length).to.eq(2);

                result.forEach((instruction) => {
                    expect(instruction.operator).to.be.a("string");
                    expect(instruction.operands).to.be.an("array");
                });
            });

            it("should correctly evaluate an instruction with one operator and operand", function() {
                const result = parse("inc a");

                expect(result).to.eql([{
                    operator: "inc",
                    operands: ["a"]
                }]);
            });

            it("should correctly evaluate an instruction with one operator and multiple operands", function() {
                const result = parse("jio a, +18");

                expect(result).to.eql([{
                    operator: "jio",
                    operands: ["a", "+18"]
                }]);
            });
            
        });

    });

});
