import { expect } from "chai";
import { title, parse, getNeighbours, animate } from "./";
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

        describe("animate", function() {

            it("should turn on lights that have exactly 3 neighbours on", function() {
                const input = [
                    ".#",
                    "##",
                ].join("\n");
                const grid = parse(input);

                animate(grid);
                
                expect(grid[0][0]).to.eq("#");
            });

            it("should leave the light on that has 2 neighbours on", function() {
                const input = [
                    "##",
                    ".#",
                ].join("\n");
                const grid = parse(input);

                animate(grid);
                
                expect(grid[0][0]).to.eq("#");
            });
            
            it("should keep the light on that has 3 neighbours on", function() {
                const input = [
                    "##",
                    "##",
                ].join("\n");
                const grid = parse(input);

                animate(grid);
                
                expect(grid[0][0]).to.eq("#");
            });

            it("should turn the light off if it doesn't have 2-3 neighbours on", function() {
                const isTurnedOff = (input) => {
                    const grid = parse(input.join("\n"));

                    animate(grid);
                
                    expect(grid[0][0]).to.eq(".");
                };

                isTurnedOff(["#.", ".."]);
                isTurnedOff(["##", ".."]);
                isTurnedOff(["#.", "#."]);
                isTurnedOff(["#.", ".#"]);
            });
            
            it("should correctly animate the example initial state", function() {
                const input = [
                    ".#.#.#",
                    "...##.",
                    "#....#",
                    "..#...",
                    "#.#..#",
                    "####.."
                ].join("\n");
                const grid = parse(input);

                animate(grid);
                
                expect(grid).to.eql([
                    [".", ".", "#", "#", ".", "."],
                    [".", ".", "#", "#", ".", "#"],
                    [".", ".", ".", "#", "#", "."],
                    [".", ".", ".", ".", ".", "."],
                    ["#", ".", "#", "#", ".", "#"],
                    ["#", ".", "#", "#", ".", "."]
                ]);
            });

            it("should correctly animate the example step 1", function() {
                const input = [
                    "..##..",
                    "..##.#",
                    "...##.",
                    "......",
                    "#.....",
                    "#.##.."
                ].join("\n");
                const grid = parse(input);

                animate(grid);
                
                expect(grid).to.eql([
                    [".", ".", "#", "#", "#", "."],
                    [".", ".", ".", ".", ".", "."],
                    [".", ".", "#", "#", "#", "."],
                    [".", ".", ".", ".", ".", "."],
                    [".", "#", ".", ".", ".", "."],
                    [".", "#", ".", ".", ".", "."]
                ]);
            });

        });

    });

});
