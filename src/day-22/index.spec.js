import { expect } from "chai";
import { title, parse, getLeastManaAndWin } from "./";

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

        describe("getLeastManaAndWin", function() {

            it("should return a number, given a list of spells, a player and an opponent", function() {
                const spells = [];
                const player = {};
                const opponent = {};
                const result = getLeastManaAndWin(spells, player, opponent);
                
                expect(result).to.be.a("number");
            });

            it("should return 96, given an example damage spell", function() {
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

                const result = getLeastManaAndWin(spells, player, opponent);
                
                expect(result).to.eq(96);
            });

            it("should return 92, given two example damage spells", function() {
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

                // Use spell one x3. Opponent killed.
                // {win: true, mana: 96}, // [1, 1, 1]

                // Combination of both spells. Out of mana.
                // {win: false, mana: 124}, // [2, 1, 1]
                
                // Combination of both spells. Opponent killed.
                // {win: true, mana: 92}, // [1, 2]
                // {win: true, mana: 92}, // [2, 1]
                
                // Use spell two x2. Out of mana.
                // {win: false, mana: 120} // [2, 2]

                expect(getLeastManaAndWin(spells, player, opponent)).to.eq(92);
            });

            it("should return 96, given example damage and heal spells", function() {
                const spells = [
                    {
                        name: "Spell One",
                        cost: 32,
                        damage: 2,
                        turns: 0
                    },
                    {
                        name: "Spell Two",
                        cost: 65,
                        health: 5,
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

                // Use spell one x3. Opponent killed.
                // {win: true, mana: 96}, // [1, 1, 1]
                
                // Combination of both spells. Out of mana.
                // {win: false, mana: 129}, // [1, 1, 2]
                // {win: false, mana: 129}, // [1, 2, 1]
                // {win: false, mana: 162}, // [1, 2, 2]
                // {win: false, mana: 129}, // [2, 1, 1]
                // {win: false, mana: 162}, // [2, 1, 2]
                
                // Use spell two x2. Out of mana.
                // {win: false, mana: 130} // [2, 2]
                
                expect(getLeastManaAndWin(spells, player, opponent)).to.eq(96);
            });

            it("should return 96, given example damage and armor spells", function() {
                const spells = [
                    {
                        name: "Spell One",
                        cost: 32,
                        damage: 2,
                        turns: 0
                    },
                    {
                        name: "Spell Two",
                        cost: 30,
                        armor: 2,
                        turns: 4
                    }
                ];
                const player = {
                    health: 10,
                    mana: 100
                };
                const opponent = {
                    health: 6,
                    damage: 4
                };

                // Use spell one x3. Opponent killed.
                // {win: true, mana: 96}, // [1, 1, 1]
                
                // Combination of both spells. Player killed.
                // {win: false, mana: 94}, // [1, 1, 2]
                
                // Combination of both spells. Out of mana.
                // {win: false, mana: 126}, // [1, 2, 1, 1]
                // {win: false, mana: 124}, // [1, 2, 1, 2]
                // {win: false, mana: 126}, // [2, 1, 1, 1]
                // {win: false, mana: 124}, // [2, 1, 1, 2]
                // {win: false, mana: 124}, // [2, 1, 2, 1]
                
                expect(getLeastManaAndWin(spells, player, opponent)).to.eq(96);
            });

            it("should return an array of 8 outcomes, given damage and mana spells", function() {
                const spells = [
                    {
                        name: "Spell One",
                        cost: 32,
                        damage: 2,
                        turns: 0
                    },
                    {
                        name: "Spell Two",
                        cost: 30,
                        mana: 45,
                        turns: 2
                    }
                ];
                const player = {
                    health: 10,
                    mana: 100
                };
                const opponent = {
                    health: 6,
                    damage: 4
                };

                // Use spell one x3. Opponent killed.
                // {win: true, mana: 96}, // [1, 1, 1]
                
                // Combination of both spells. Player killed.
                // {win: false, mana: 94}, // [1, 1, 2]
                // {win: false, mana: 94}, // [1, 2, 1]
                // {win: false, mana: 92}, // [1, 2, 2]
                // {win: false, mana: 94}, // [2, 1, 1]
                // {win: false, mana: 92}, // [2, 2, 1]
                // {win: false, mana: 92}, // [2, 1, 2]

                // Use spell two x3. Player killed.
                // {win: false, mana: 90}, // [2, 2, 2]
                
                // Note: do not include mana recharge effects as "spending" negative mana.
                expect(getLeastManaAndWin(spells, player, opponent)).to.eq(96);
            });
            
        });

    });

    describe("Part 2:", function() {

        describe("getLeastManaAndWin", function() {

            it("should return 126, given example damage and armor spells on 'hard' difficulty", function() {
                const spells = [
                    {
                        name: "Spell One",
                        cost: 32,
                        damage: 2,
                        turns: 0
                    },
                    {
                        name: "Spell Two",
                        cost: 30,
                        armor: 3,
                        turns: 6
                    }
                ];
                const player = {
                    health: 10,
                    mana: 130
                };
                const opponent = {
                    health: 6,
                    damage: 4
                };

                // Use spell one x2. Player killed.
                // {win: false, mana: 64}, // [1, 1]

                // Combination of both spells. Player killed
                // {win: false, mana: 94}, // [1, 2, 1]

                // Combination of both spells. Opponent killed
                // {win: true, mana: 126}, // [2, 1, 1, 1]
                
                expect(getLeastManaAndWin(spells, player, opponent, "hard")).to.eq(126);
            });
            
        });

    });

});
