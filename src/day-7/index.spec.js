import { expect } from "chai";
import { title, execute } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        it("should evaluate '123 -> x' as '{x: 123}'", function() {
            expect(execute({}, "123 -> x")).to.eql({x: 123});
        });

        it("should evaluate 'x AND y -> d' as '{d: x & y}'", function() {
            expect(execute({x: 1, y: 2}, "x AND y -> d")).to.eql({
                x: 1,
                y: 2,
                d: 1 & 2
            });
        });

        it("should evaluate 'x OR y -> e' as '{e: x | y}'", function() {
            
        });

        it("should evaluate 'x LSHIFT 2 -> f' as '{f: x << 2}'", function() {
            
        });

        it("should evaluate 'y RSHIFT 2 -> g' as '{g: y >> 2}'", function() {
            
        });

        it("should evaluate 'NOT x -> h' as '{h: ~x}' (negative numbers warp)", function() {
            
        });
        
    });

});
