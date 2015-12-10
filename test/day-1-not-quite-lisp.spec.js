import { expect } from "chai";
import { getFloor, atBasement, title } from "../src/day-1-not-quite-lisp";

describe(title, function() {

    describe("Part 1:", function() {
    
        it("should evaluate '(())' and '()()' as floor 0", function() {
            expect(getFloor("(())")).to.eq(0);
            expect(getFloor("()()")).to.eq(0);
        });

        it("should evaluate '(((' and '(()(()(' as floor 3", function() {
            expect(getFloor("(((")).to.eq(3);
            expect(getFloor("(()(()(")).to.eq(3);
        });

        it("should evaluate '))(((((' as floor 3", function() {
            expect(getFloor("))(((((")).to.eq(3);
        });

        it("should evaluate '())' and '))(' as floor -1", function() {
            expect(getFloor("())")).to.eq(-1);
            expect(getFloor("))(")).to.eq(-1);
        });

        it("should evalute ')))' and ')())())' as floor -3", function() {
            expect(getFloor(")))")).to.eq(-3);
            expect(getFloor(")())())")).to.eq(-3);
        });

    });

    describe("Part 2:", function() {

        it("should evaluate ')' as postion 1", function() {
            expect(atBasement(")")).to.eq(1);
        });

        it("should evaluate '()())' as position 5", function() {
            expect(atBasement("()())")).to.eq(5);
        });
        
    });

});
