import { expect } from "chai";
import { title, validate, nextPassword } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("validate", function() {

            it("should evaluate 'hijklmmn' as invalid", function() {
                expect(validate("hijklmmn")).to.eq(false);
            });

            it("should evaluate 'abbceffg' as invalid", function() {
                expect(validate("abbceffg")).to.eq(false);
            });

            it("should evaluate 'abbcegjk' as invalid", function() {
                expect(validate("abbcegjk")).to.eq(false);
            });

            it("should evaluate 'abcdffaa' as valid", function() {
                expect(validate("abcdffaa")).to.eq(true);
            });

            it("should evaluate 'ghjaabcc' as valid", function() {
                expect(validate("ghjaabcc")).to.eq(true);
            });

        });

        xdescribe("nextPassword", function() {

            it("should return the next password after 'abcdefgh' as 'abcdffaa'", function() {
                expect(nextPassword("abcdefgh")).to.eq("abcdffaa");
            });

            it("should return the next password after 'ghijklmn' as 'ghjaabcc'", function() {
                expect(nextPassword("ghijklmn")).to.eq("ghjaabcc");
            });

        });

    });

});
