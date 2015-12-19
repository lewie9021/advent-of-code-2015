import { expect } from "chai";
import { title, lookSay } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        it("should evaluate '1' as '11'", function() {
            expect(lookSay("1")).to.eql("11");
        });

        it("should evaluate '11' as '21'", function() {
            expect(lookSay("11")).to.eql("21");
        });

        it("should evaluate '21' as '1211'", function() {
            expect(lookSay("21")).to.eql("1211");
        });

        it("should evaluate '1211' as '111221'", function() {
            expect(lookSay("1211")).to.eql("111221");
        });

        it("should evaluate '111221' as '312211'", function() {
            expect(lookSay("111221")).to.eql("312211");
        });

    });

});
