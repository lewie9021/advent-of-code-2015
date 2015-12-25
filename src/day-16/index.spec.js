import { expect } from "chai";
import { title, getMatchPercentage } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("getMatchPercentage", function() {

            it("should return null if the subject has no matching properties", function() {
                const example = {a: 1, b: 2};
                const subject = {a: 2, b: 1};

                expect(getMatchPercentage(example, subject)).to.eq(null);
            });

            it("should return null if the subject has at least one property that doesn't match", function() {
                const example = {a: 1, b: 2};
                const subject = {a: 1, b: 1};

                expect(getMatchPercentage(example, subject)).to.eq(null);
            });

            it("should return 100 if the subject matches every property", function() {
                const example = {a: 1, b: 2};
                const subject = {a: 1, b: 2};

                expect(getMatchPercentage(example, subject)).to.eq(100);
            });

            it("should return 50 if the subject matches on present properties but missing the other half", function() {
                const example = {a: 1, b: 2, c: 3, d: 4};
                const subject = {a: 1, b: 2};

                expect(getMatchPercentage(example, subject)).to.eq(50);
            });

            it("should return 0 if the subject is empty", function() {
                const example = {a: 1, b: 2, c: 3, d: 4};
                const subject = {};

                expect(getMatchPercentage(example, subject)).to.eq(0);
            });
            
        });
        
    });

});
