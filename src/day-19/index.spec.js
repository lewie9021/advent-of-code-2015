import { expect } from "chai";
import { title, parse, getDistinctMolecules, fabricateMolecule } from "./";
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
                const result = getDistinctMolecules(molecule, replacements);

                expect(result).to.be.an("array");
                _.forEach(() => expect(result).to.be.a("string"));
            });

            it("should not return any duplicates", function() {
                const {molecule, replacements} = parse(this.input);
                const result = getDistinctMolecules(molecule, replacements);

                expect(_.unique(result).length).to.eq(result.length);
            });

            it("should replace keys with multiple characters", function() {
                const input = [
                    "Al => ThF",
                    "",
                    "iBSiAlArPBCaC"
                ];
                const {molecule, replacements} = parse(input);
                const result = getDistinctMolecules(molecule, replacements);

                expect(result.length).to.eq(1);
                expect(result[0]).to.eq("iBSiThFArPBCaC");
            });

            it("should return exactly 4 distinct molecules, given the initial example", function() {
                const {molecule, replacements} = parse(this.input);
                const result = getDistinctMolecules(molecule, replacements);
                const molecules = [
                    "HOOH",
                    "HOHO",
                    "OHOH",
                    "HHHH",
                ];

                expect(result.length).to.eq(4);
                
                _.forEach((expected) => {
                    const matches = _.filter((res) => _.isEqual(res, expected), result);

                    expect(matches.length).to.eq(1);
                }, molecules);
            });

            it("should return exactly 7 distinct molecules, given Santa's favourite molecule", function() {
                const input = [
                    "H => HO",
                    "H => OH",
                    "O => HH",
                    "",
                    "HOHOHO"
                ];
                const {molecule, replacements} = parse(input);
                const result = getDistinctMolecules(molecule, replacements);
                const molecules = [
                    "HOOHOHO",
                    "HOHOOHO",
                    "HOHOHOO",
                    "OHOHOHO",
                    "HHHHOHO",
                    "HOHHHHO",
                    "HOHOHHH"
                ];

                expect(result.length).to.eq(7);
                
                _.forEach((expected) => {
                    const matches = _.filter((res) => _.isEqual(res, expected), result);

                    expect(matches.length).to.eq(1);
                }, molecules);
            });

        });

    });

    describe("Part 2:", function() {

        describe("fabricateMolecule", function() {

            it("should return 3, given 'HOH' and the example replacements", function() {
                const input = [
                    "e => O",
                    "O => HH",
                    "H => OH",
                    "",
                    "HOH"
                ];
                const {molecule, replacements} = parse(input);
                const result = fabricateMolecule("e", molecule, replacements);

                expect(result).to.eq(3);
            });

            it("should return 6, given 'HOHOHO' and the example replacements", function() {
                const input = [
                    "e => O",
                    "O => HH",
                    "H => OH",
                    "",
                    "HOHOHO"
                ];
                const {molecule, replacements} = parse(input);
                const result = fabricateMolecule("e", molecule, replacements);

                expect(result).to.eq(6);
            });
            
        });
        
    });
    
});
