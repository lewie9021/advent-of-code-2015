import { expect } from "chai";
import { title, parse } from "./";
import _ from "lodash-fp";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {
            
            it("should return an object containing props 'replacements' and 'molecule'", function() {
                const input = [
                    "H => HO",
                    "H => OH",
                    "O => HH",
                    "",
                    "HOH"
                ];
                const result = parse(input);

                expect(result).to.be.an("object");
                expect(result).to.have.property("replacements");
                expect(result).to.have.property("molecule");
            });

            it("should return an array of replacements containing props 'key' and 'value'", function() {
                const input = [
                    "H => HO",
                    "H => OH",
                    "O => HH",
                    "",
                    "HOH"
                ];
                const {replacements} = parse(input);

                _.forEach((replacement) => {
                    expect(replacement).to.be.an("object");
                    expect(replacement).to.have.property("key");
                    expect(replacement).to.have.property("value");
                }, replacements);
            });

            it("should return the molecule string, found the end of the input", function() {
                const input = [
                    "H => HO",
                    "H => OH",
                    "O => HH",
                    "",
                    "HOH"
                ];
                const {molecule} = parse(input);

                expect(molecule).to.eq("HOH");
            });
            
        });

    });

});
