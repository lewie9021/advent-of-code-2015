import { expect } from "chai";
import { title, parse, getCombinations } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {

            before(function() {
                this.generateInput = (health, damage) => [
                    "Hit Points: " + health,
                    "Damage: " + damage
                ].join("\n");
            });

            it("should return an object with the properties: 'health' and 'damage'", function() {
                const result = parse(this.generateInput(32, 15));

                expect(result).to.be.an("object");
                expect(result).to.have.all.keys(["health", "damage"]);
            });

            it("should return the correct values from the inputs", function() {
                const test = (health, damage) => {
                    const result = parse(this.generateInput(health, damage));
                    
                    expect(result).to.eql({health, damage});
                };

                test(22, 13);
                test(0, 5);
                test(43, 0);
                test(530, 4);
                test(1, 66);
                test(34, 150);
            });
            
        });

        describe("getCombinations", function() {

            it("should return an array, given an array of spells, a player and an opponent", function() {
                const spells = [];
                const player = {};
                const opponent = {};
                const result = getCombinations(spells, player, opponent);
                
                expect(result).to.be.an("array");
                expect(result).to.be.empty;
            });

            it("should return an array of objects with the properties: 'win' and 'mana'", function() {
                const spells = [{
                    name: "Spell One",
                    cost: 32,
                    damage: 2,
                    turns: 0
                }];
                const player = {
                    health: 10,
                    mana: 100
                };
                const opponent = {
                    health: 6,
                    damage: 1
                };

                getCombinations(spells, player, opponent).forEach((combination) => {
                    expect(combination).to.be.an("object");
                    expect(combination).to.have.all.keys(["win", "mana"]);
                });
            });

            it("should return an array with 1 combination, given a simple damage spell", function() {
                const spells = [{
                    name: "Spell One",
                    cost: 32,
                    damage: 2,
                    turns: 0
                }];
                const player = {
                    health: 10,
                    mana: 100
                };
                const opponent = {
                    health: 6,
                    damage: 1
                };

                // Turn 1:
                // Player = {health: 10, mana: 68}
                // Opponent = {health: 4}

                // Turn 2:
                // Player = {health: 9, mana: 68}
                // Opponent = {health: 4}
                
                // Turn 3:
                // Player = {health: 9, mana: 36}
                // Opponent = {health: 2}

                // Turn 4:
                // Player = {health: 8, mana: 36}
                // Opponent = {health: 2}

                // Turn 5:
                // Player = {health: 8, mana: 4}
                // Opponent = {health: 0}

                const result = getCombinations(spells, player, opponent);
                
                expect(result).to.eql([{
                    win: true,
                    mana: 96
                }]);
            });

            it("should return an array with 1 combination, given two damage spell", function() {
                const spells = [
                    {
                        name: "Spell One",
                        cost: 32,
                        damage: 2,
                        turns: 0
                    },
                    {
                        name: "Spell Two",
                        cost: 60,
                        damage: 4,
                        turns: 0
                    }
                ];
                const player = {
                    health: 10,
                    mana: 100
                };
                const opponent = {
                    health: 6,
                    damage: 1
                };

                // Use spell one x3, killing the opponent.
                // [1, 1, 1]

                // Combination of both spells, killing the opponent.
                // [1, 2]
                // [2, 1]
                
                // We ran out of mana. We lose.
                // [2, 2]

                const result = getCombinations(spells, player, opponent);

                // TODO: We don't care about order though .eql does.
                expect(result).to.eql([
                    {
                        win: true,
                        mana: 96
                    },
                    {
                        win: true,
                        mana: 92
                    },
                    {
                        win: true,
                        mana: 92
                    },
                    {
                        win: false,
                        mana: 120
                    }
                ]);
            });
            
        });

    });

});
