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

        describe("nextPassword", function() {

            it("should return 'deffaacz' as the next password after 'deffaaba'", function() {
                expect(nextPassword("deffaabz")).to.eq("deffaaca");
            });
            
            xit("should return 'abcdffaa' as the next password after 'abcdefgh'", function() {
                expect(nextPassword("abcdefgh")).to.eq("abcdffaa");
            });

            xit("should return 'ghjaabcc' as the next password after 'ghijklmn'", function() {
                expect(nextPassword("ghijklmn")).to.eq("ghjaabcc");
            });

        });

    });

});
