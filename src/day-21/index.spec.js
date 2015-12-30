import _ from "lodash-fp";
import { expect } from "chai";
import { title, parse, simulate, getPermutations } from "./";

// Notes / Rules:
// - You vs Boss.
// - You always go first.
// - An attack will always deduct at least 1 hit point.
// - Damage dealt = Math.max(1, attacker's damage - defender's armor).
// - Start with no items, unlimited gold.
// - You have 100 hit points.
// - Weapon isn't optional, must have one.
// - Armour is optional, can have just one.
// - Rings are optional, can have up to two.
// - All items bought must be used.
// - Can't buy duplicate items (rings).

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {

            it("should return a stats object", function() {
                const input = [
                    "Hit Points: 25",
                    "Damage: 2",
                    "Armor: 7"
                ].join("\n");

                expect(parse(input)).to.be.an("object");
            });

            it("should contain the keys 'health', 'damage', and 'armor'", function() {
                const input = [
                    "Hit Points: 14",
                    "Damage: 25",
                    "Armor: 4"
                ].join("\n");
                
                expect(parse(input)).to.have.all.keys([
                    "health",
                    "damage",
                    "armor"
                ]);
            });

            it("should correctly parse the given example string", function() {
                const input = [
                    "Hit Points: 300",
                    "Damage: 4",
                    "Armor: 0"
                ].join("\n");
                
                expect(parse(input)).to.eql({
                    health: 300,
                    damage: 4,
                    armor: 0
                });
            });
            
        });

        describe("simulate", function() {

            it("should return true, given the example scenario", function() {
                const player = {
                    health: 8,
                    damage: 5,
                    armor: 5
                };
                const opponent = {
                    health: 12,
                    damage: 7,
                    armor: 2
                };
                
                expect(simulate(player, opponent)).to.eq(true);
            });

            it("should return true, given matching stats", function() {
                const player = {
                    health: 8,
                    damage: 5,
                    armor: 5
                };

                expect(simulate(player, player)).to.eq(true);
            });

            it("should return false, given 'opponent' wins", function() {
                const player = {
                    health: 8,
                    damage: 5,
                    armor: 5
                };
                const opponent = {
                    health: 12,
                    damage: 50,
                    armor: 2
                };
                
                expect(simulate(player, opponent)).to.eq(false);
            });
            
        });

        describe("getPermutations", function() {

            it("should return an array of arrays", function() {
                const permutations = getPermutations([1, 1, 1, 1]);
                const isArray = (x) => expect(x).to.be.an("array");
                
                isArray(permutations);

                _.forEach(isArray, permutations);
            });

            it("should return arrays with a length which matches the blueprint", function() {
                const test = (length) => {
                    const blueprint = _.fill(1, Array(length));
                    const permutations = getPermutations(blueprint);
                    const correctLength = _.compose(
                        _.every(_.isEqual(blueprint.length)),
                        _.map(_.get("length"))
                    );

                    expect(correctLength(permutations)).to.eq(true);
                };

                _.times(test, 10);
            });

            it("should return 8 permutations, given [1, 1, 1]", function() {
                const permutations = getPermutations([1, 1, 1]);
                const expected = [
                    [0, 0, 0],
                    [0, 0, 1],
                    [0, 1, 0],
                    [0, 1, 1],
                    [1, 0, 0],
                    [1, 0, 1],
                    [1, 1, 0],
                    [1, 1, 1]
                ];

                expect(permutations.length).to.eq(expected.length);

                // TODO: ensure each expected permuation is present.
            });

            it("should return 12 permutations, given [2, 1, 1]", function() {
                const permutations = getPermutations([2, 1, 1]);
                const expected = [
                    [0, 0, 0],
                    [0, 0, 1],
                    [0, 1, 0],
                    [0, 1, 1],
                    [1, 0, 0],
                    [1, 0, 1],
                    [1, 1, 0],
                    [1, 1, 1],
                    [2, 0, 0],
                    [2, 0, 1],
                    [2, 1, 0],
                    [2, 1, 1]
                ];

                expect(permutations.length).to.eq(expected.length);

                // TODO: ensure each expected permuation is present.
            });
            
        });

    });

});

