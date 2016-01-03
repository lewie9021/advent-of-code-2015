import { expect } from "chai";
import { title, parse, execute } from "./";

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

        describe("execute", function() {

            it("should support the inc (increment) operator", function() {
                const input = [
                    "inc a",
                    "inc b"
                ].join("\n");
                const instructions = parse(input);
                const results = execute(instructions);

                expect(results).to.eql({a: 1, b: 1});
            });
            
            it("should support the hlf (half) operator", function() {
                const input = [
                    "inc a",
                    "inc a",
                    "inc a",
                    "inc a",
                    "hlf a",
                ].join("\n");
                const instructions = parse(input);
                const results = execute(instructions);

                expect(results).to.eql({a: 2, b: 0});
            });

            it("should floor floats as a result of the hlf operator", function() {
                const input = [
                    "inc a",
                    "inc a",
                    "inc a",
                    "inc b",
                    "hlf a",
                    "hlf b"
                ].join("\n");
                const instructions = parse(input);
                const results = execute(instructions);

                expect(results).to.eql({a: 1, b: 0});
            });

            it("should support the tpl (triple) operator", function() {
                const input = [
                    "inc a",
                    "tpl a",
                ].join("\n");
                const instructions = parse(input);
                const results = execute(instructions);

                expect(results).to.eql({a: 3, b: 0});
            });

            it("should support the jmp (jump) operator", function() {
                const input = [
                    "inc a",
                    "jmp +3",
                    "inc a",
                    "inc b",
                    "inc a"
                ].join("\n");
                const instructions = parse(input);
                const results = execute(instructions);

                expect(results).to.eql({a: 2, b: 0});
            });

            it("should support the jie (jump if even) operator", function() {
                const input = [
                    "jie a, +2",
                    "inc a",
                    "inc b",
                    "inc a",
                    "jie a, +2",
                    "inc a"
                ].join("\n");
                const instructions = parse(input);
                const results = execute(instructions);

                expect(results).to.eql({a: 2, b: 1});
            });

            it("should support the jio (jump if one) operator", function() {
                const input = [
                    "inc b",
                    "inc a",
                    "jio a, -2",
                    "inc b",
                    "inc a"
                ].join("\n");
                const instructions = parse(input);
                const results = execute(instructions);

                expect(results).to.eql({a: 3, b: 3});
            });
            
            it("should return {a: 2, b: 0}, given the example instruction set", function() {
                const input = [
                    "inc a",
                    "jio a, +2",
                    "tpl a",
                    "inc a"
                ].join("\n");
                const instructions = parse(input);
                const results = execute(instructions);

                expect(results).to.eql({a: 2, b: 0});
            });
            
        });
        
    });

});
