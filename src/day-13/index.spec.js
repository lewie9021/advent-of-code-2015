import { expect } from "chai";
import { title, parse, calculateSeating } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        before(function() {
            this.example = [
                "Alice would gain 54 happiness units by sitting next to Bob.",
                "Alice would lose 79 happiness units by sitting next to Carol.",
                "Alice would lose 2 happiness units by sitting next to David.",
                "Bob would gain 83 happiness units by sitting next to Alice.",
                "Bob would lose 7 happiness units by sitting next to Carol.",
                "Bob would lose 63 happiness units by sitting next to David.",
                "Carol would lose 62 happiness units by sitting next to Alice.",
                "Carol would gain 60 happiness units by sitting next to Bob.",
                "Carol would gain 55 happiness units by sitting next to David.",
                "David would gain 46 happiness units by sitting next to Alice.",
                "David would lose 7 happiness units by sitting next to Bob.",
                "David would gain 41 happiness units by sitting next to Carol."
            ];
        });

        describe("parse", function() {

            it("should map the happiness sentences to an array of objects", function() {
                expect(Array.isArray(parse(this.example))).to.eq(true);
            });

            it("should create objects with the properties: 'guest', 'neighbour', and 'value'", function() {
                const result = parse(this.example);

                result.forEach((x) => expect(x).to.have.all.keys(["guest", "neighbour", "value"]));
            });

            it("should make the first name in the sentence the guest", function() {
                const result = parse(this.example);

                result.forEach((x, i) => {
                    const [guest] = this.example[i].match(/[A-Z]{1}[a-z]+/g);
                    
                    expect(x.guest).to.eq(guest);
                });
            });

            it("should make the last name in the sentence the neighbour", function() {
                const result = parse(this.example);

                result.forEach((x, i) => {
                    const [, neighbour] = this.example[i].match(/[A-Z]{1}[a-z]+/g);
                    
                    expect(x.neighbour).to.eq(neighbour);
                });
            });

            it("should make the value property positive if the word 'gain' is present", function() {
                const result = parse(this.example);

                result.forEach((x, i) => {
                    const [adjustment] = this.example[i].match(/(gain|lose)/);

                    if (adjustment == "gain")
                        expect(x.value).to.be.at.least(0);
                });
            });

            it("should make the value property negative if the word 'lose' is present", function() {
                const result = parse(this.example);

                result.forEach((x, i) => {
                    const [adjustment] = this.example[i].match(/(gain|lose)/);

                    if (adjustment == "lose")
                        expect(x.value).to.be.at.most(0);
                });
            });
            
        });
        
        describe("calculateSeating", function() {
            
            it("should return 330 as the total optimal happiness for the given example", function() {
                const input = parse(this.example);

                expect(calculateSeating(input)).to.eq(330);
            });
            
        });

    });

});
