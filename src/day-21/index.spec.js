import _ from "lodash-fp";
import { expect } from "chai";
import { title, parse, simulate, getPermutations, getLeastGoldAndWin, getMostGoldAndLose } from "./";
import { fill } from "../helpers";

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
                const result = getPermutations([1, 1, 1, 1]);
                const isArray = (x) => expect(x).to.be.an("array");
                
                isArray(result);

                _.forEach(isArray, result);
            });

            it("should return arrays with a length which matches the blueprint", function() {
                const test = (length) => {
                    const blueprint = fill(1, Array(length));
                    const result = getPermutations(blueprint);
                    const correctLength = _.compose(
                        _.every(_.isEqual(length)),
                        _.map(_.get("length"))
                    );

                    expect(correctLength(result)).to.eq(true);
                };

                _.times(test, 10);
            });

            it("should return 8 permutations, given [1, 1, 1]", function() {
                const result = getPermutations([1, 1, 1]);
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
                
                expect(result.length).to.eq(expected.length);

                _.forEach((expected) => {
                    const match = _.filter((res) => _.isEqual(res, expected), result);

                    expect(match.length).to.eq(1);
                }, result);
            });

            it("should return 12 permutations, given [2, 1, 1]", function() {
                const result = getPermutations([2, 1, 1]);
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

                expect(result.length).to.eq(expected.length);

                _.forEach((expected) => {
                    const match = _.filter((res) => _.isEqual(res, expected), result);

                    expect(match.length).to.eq(1);
                }, result);
            });
            
        });

        describe("getLeastGoldAndWin", function() {

            before(function() {
                const weapons = [
                    {
                        cost: 1,
                        damage: 5,
                        armor: 0
                    }
                ];
                const armor = [
                    {
                        cost: 1,
                        damage: 0,
                        armor: 10
                    }
                ];
                const rings = [
                    {
                        cost: 1,
                        damage: 4,
                        armor: 0
                    },
                    {
                        cost: 2,
                        damage: 0,
                        armor: 4
                    }
                ];

                this.shop = {
                    weapons,
                    armor,
                    rings
                };
            });
            
            it("should return 2 given 10 health and the example opponent", function() {
                const opponent = {
                    health: 12,
                    damage: 8,
                    armor: 2
                };

                // win: false
                // 1, 0, 0, 0 = 1 cost, 5 damage, 0 armor.
                // 1, 0, 0, 0

                // win: true
                // 1, 0, 0, 1 = 2 cost, 9 damage, 0 armor
                // 1, 0, 1, 0

                // win: true
                // 1, 0, 1, 2 = 4 cost, 9 damage, 4 armor
                // 1, 0, 2, 1

                // win: false
                // 1, 0, 0, 2 = 3 cost, 5 damage, 4 armor
                // 1, 0, 2, 0

                // win: true
                // 1, 1, 0, 0 = 2 cost, 5 damage, 10 armor.
                // 1, 1, 0, 0

                // win: true
                // 1, 1, 1, 0 = 3 cost, 9 damage, 10 armor.
                // 1, 1, 0, 1

                // win: true
                // 1, 1, 1, 2 = 5 cost, 9 damage, 14 armor.
                // 1, 1, 2, 1

                // win: true
                // 1, 1, 0, 2 = 4 cost, 5 damage, 14 armor
                // 1, 1, 2, 0

                expect(getLeastGoldAndWin(this.shop, 10, opponent)).to.eq(2);
            });

            it("should return 3 given 2 health and the example opponent", function() {
                const opponent = {
                    health: 12,
                    damage: 8,
                    armor: 2
                };

                // win: false
                // 1, 0, 0, 0 = 1 cost, 5 damage, 0 armor.
                // 1, 0, 0, 0

                // win: false
                // 1, 0, 0, 1 = 2 cost, 9 damage, 0 armor
                // 1, 0, 1, 0

                // win: false
                // 1, 0, 1, 2 = 4 cost, 9 damage, 4 armor
                // 1, 0, 2, 1

                // win: false
                // 1, 0, 0, 2 = 3 cost, 5 damage, 4 armor
                // 1, 0, 2, 0

                // win: false
                // 1, 1, 0, 0 = 2 cost, 5 damage, 10 armor.
                // 1, 1, 0, 0

                // win: true
                // 1, 1, 1, 0 = 3 cost, 9 damage, 10 armor.
                // 1, 1, 0, 1

                // win: true
                // 1, 1, 1, 2 = 5 cost, 9 damage, 14 armor.
                // 1, 1, 2, 1

                // win: false
                // 1, 1, 0, 2 = 4 cost, 5 damage, 14 armor
                // 1, 1, 2, 0

                expect(getLeastGoldAndWin(this.shop, 2, opponent)).to.eq(3);
            });
            
        });

    });

    describe("Part2:", function() {

        describe("getMostGoldAndLose", function() {

            before(function() {
                const weapons = [
                    {
                        cost: 1,
                        damage: 5,
                        armor: 0
                    }
                ];
                const armor = [
                    {
                        cost: 1,
                        damage: 0,
                        armor: 10
                    }
                ];
                const rings = [
                    {
                        cost: 1,
                        damage: 4,
                        armor: 0
                    },
                    {
                        cost: 2,
                        damage: 0,
                        armor: 4
                    }
                ];

                this.shop = {
                    weapons,
                    armor,
                    rings
                };
            });
            
            it("should return 3 given 10 health and the example opponent", function() {
                const opponent = {
                    health: 12,
                    damage: 8,
                    armor: 2
                };

                // win: false
                // 1, 0, 0, 0 = 1 cost, 5 damage, 0 armor.
                // 1, 0, 0, 0

                // win: true
                // 1, 0, 0, 1 = 2 cost, 9 damage, 0 armor
                // 1, 0, 1, 0

                // win: true
                // 1, 0, 1, 2 = 4 cost, 9 damage, 4 armor
                // 1, 0, 2, 1

                // win: false
                // 1, 0, 0, 2 = 3 cost, 5 damage, 4 armor
                // 1, 0, 2, 0

                // win: true
                // 1, 1, 0, 0 = 2 cost, 5 damage, 10 armor.
                // 1, 1, 0, 0

                // win: true
                // 1, 1, 1, 0 = 3 cost, 9 damage, 10 armor.
                // 1, 1, 0, 1

                // win: true
                // 1, 1, 1, 2 = 5 cost, 9 damage, 14 armor.
                // 1, 1, 2, 1

                // win: true
                // 1, 1, 0, 2 = 4 cost, 5 damage, 14 armor
                // 1, 1, 2, 0

                expect(getMostGoldAndLose(this.shop, 10, opponent)).to.eq(3);
            });

            it("should return 4 given 2 health and the example opponent", function() {
                const opponent = {
                    health: 12,
                    damage: 8,
                    armor: 2
                };

                // win: false
                // 1, 0, 0, 0 = 1 cost, 5 damage, 0 armor.
                // 1, 0, 0, 0

                // win: false
                // 1, 0, 0, 1 = 2 cost, 9 damage, 0 armor
                // 1, 0, 1, 0

                // win: false
                // 1, 0, 1, 2 = 4 cost, 9 damage, 4 armor
                // 1, 0, 2, 1

                // win: false
                // 1, 0, 0, 2 = 3 cost, 5 damage, 4 armor
                // 1, 0, 2, 0

                // win: false
                // 1, 1, 0, 0 = 2 cost, 5 damage, 10 armor.
                // 1, 1, 0, 0

                // win: true
                // 1, 1, 1, 0 = 3 cost, 9 damage, 10 armor.
                // 1, 1, 0, 1

                // win: true
                // 1, 1, 1, 2 = 5 cost, 9 damage, 14 armor.
                // 1, 1, 2, 1

                // win: false
                // 1, 1, 0, 2 = 4 cost, 5 damage, 14 armor
                // 1, 1, 2, 0

                expect(getMostGoldAndLose(this.shop, 2, opponent)).to.eq(4);
            });
            
        });
        
    });
    
});

