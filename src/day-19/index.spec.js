import { expect } from "chai";
import { title, parse, getDistinctMolecules } from "./";
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

            it("should return an array of replacements left to 'key' and right to 'value'", function() {
                const input = [
                    "H => HO",
                    "H => OH",
                    "O => HH",
                    "",
                    "HOH"
                ];
                const {replacements} = parse(input);

                expect(replacements).to.eql([
                    {key: "H", value: "HO"},
                    {key: "H", value: "OH"},
                    {key: "O", value: "HH"},
                ]);
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

        describe("getDistinctMolecules", function() {

            beforeEach(function() {
                this.input = [
                    "H => HO",
                    "H => OH",
                    "O => HH",
                    "",
                    "HOH"
                ];
            });
            
            it("should return an array of molecule strings", function() {
                const {molecule, replacements} = parse(this.input);
                const molecules = getDistinctMolecules(molecule, replacements);

                expect(molecules).to.be.an("array");
                _.forEach(() => expect(molecules).to.be.a("string"));
            });

            it("should not return any duplicates", function() {
                const {molecule, replacements} = parse(this.input);
                const molecules = getDistinctMolecules(molecule, replacements);

                expect(_.unique(molecules).length).to.eq(molecules.length);
            });

            it("should return exactly 4 distinct molecules, given the example", function() {
                const {molecule, replacements} = parse(this.input);
                const molecules = getDistinctMolecules(molecule, replacements);

                expect(molecules.length).to.eq(4);
            });

        });

    });

});
