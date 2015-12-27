import { expect } from "chai";
import { title, parse } from "./";
import _ from "lodash-fp";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {

            it("should return [['.', '#']] given '.#'", function() {
                const input = ".#";
                
                expect(parse(input)).to.eql([[".", "#"]]);
            });

            it("should return [['.', '.'], ['#', '.']] given '..\\n#.'", function() {
                const input = [
                    "..",
                    "#."
                ].join("\n");
                
                expect(parse(input)).to.eql([
                    [".", "."],
                    ["#", "."]
                ]);
            });

            it("should parse the initial state example correctly", function() {
                const input = [
                    ".#.#.#",
                    "...##.",
                    "#....#",
                    "..#...",
                    "#.#..#",
                    "####.."
                ].join("\n");

                expect(parse(input)).to.eql([
                    [".", "#", ".", "#", ".", "#"],
                    [".", ".", ".", "#", "#", "."],
                    ["#", ".", ".", ".", ".", "#"],
                    [".", ".", "#", ".", ".", "."],
                    ["#", ".", "#", ".", ".", "#"],
                    ["#", "#", "#", "#", ".", "."]
                ]);
            });
            
        });

        describe("getNeighbours", function() {

            beforeEach(function() {
                const input = [
                    "..##..",
                    ".#..#.",
                    "#....#"
                ].join("\n");
                
                this.grid = parse(input);
            });
            
            it("should return an array of all 8 strings, given the coordinate [1, 1]", function() {
                const coordinate = [1, 1];
                const neighbours = getNeighbours(this.grid, coordinate);
                const characters = _.groupBy(_.identity, neighbours);

                expect(characters["."].length).to.eq(6);
                expect(characters["#"].length).to.eq(2);
            });

            it("should return an array of 3 strings, given the coordinate [0, 0]", function() {
                const coordinate = [0, 0];
                const neighbours = getNeighbours(this.grid, coordinate);
                const characters = _.groupBy(_.identity, neighbours);

                expect(characters["."].length).to.eq(2);
                expect(characters["#"].length).to.eq(1);
            });

            it("should return an array of 5 strings, given the coordinate [0, 1]", function() {
                const coordinate = [0, 1];
                const neighbours = getNeighbours(this.grid, coordinate);
                const characters = _.groupBy(_.identity, neighbours);

                expect(characters["."].length).to.eq(3);
                expect(characters["#"].length).to.eq(2);
            });
            
        });

        xdescribe("animate", function() {

            it("should work", function() {
                
            });

        });

    });

});
