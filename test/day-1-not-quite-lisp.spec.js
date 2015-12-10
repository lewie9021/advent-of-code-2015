import { expect } from "chai";
import Module, { title } from "../src/day-1-not-quite-lisp";

describe(title, function() {

    it("should evaluate '(())' and '()()' to 0", function() {
        expect(Module("(())")).to.eq(0);
        expect(Module("()()")).to.eq(0);
    });

    it("should evaluate '(((' and '(()(()(' to 3", function() {
        expect(Module("(((")).to.eq(3);
        expect(Module("(()(()(")).to.eq(3);
    });

    it("should evaluate '))(((((' to 3", function() {
        expect(Module("))(((((")).to.eq(3);
    });

    it("should evaluate '())' and '))(' to -1", function() {
        expect(Module("())")).to.eq(-1);
        expect(Module("))(")).to.eq(-1);
    });

    it("should evalute ')))' and ')())())' to -3", function() {
        expect(Module(")))")).to.eq(-3);
        expect(Module(")())())")).to.eq(-3);
    });

});
