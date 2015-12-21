import _ from "lodash-fp";
import { expect } from "chai";
import { title, parse, race, getWinner, reindeer } from "./";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {

            it("should return objects with properties 'name', 'speed', 'flyTime', and 'restTime'", function() {
                const input = [
                    "Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds.",
                    "Rudolph can fly 3 km/s for 15 seconds, but then must rest for 28 seconds."
                ];
                const result = parse(input);
                
                expect(Array.isArray(result)).to.eq(true);
                expect(result.length).to.eq(2);

                result.forEach((description) => expect(description).to.be.an("object"));
            });

            it("should make the first word in each sentence the 'name'", function() {
                const input = ["Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds."];
                const [description] = parse(input);

                expect(description).to.have.property("name", "Vixen");
            });

            it("should make the first integer in each sentence the 'speed'", function() {
                const input = ["Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds."];
                const [description] = parse(input);

                expect(description).to.have.property("speed", 19);
            });

            it("should make the second integer in each sentence the 'flyTime'", function() {
                const input = ["Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds."];
                const [description] = parse(input);

                expect(description).to.have.property("flyTime", 7);
            });

            it("should make the last integer in each sentence the 'restTime'", function() {
                const input = ["Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds."];
                const [description] = parse(input);

                expect(description).to.have.property("restTime", 124);
            });
            
        });
        
        describe("race", function() {

            it("should expect an array of descriptions", function() {
                expect(() => race()).to.throw("You must provide an array of descriptions.");
            });

            it("should expect an duration in seconds", function() {
                expect(() => race([])).to.throw("You must provide duration time.");
            });

            it("should return an array of participants with their name and distance covered", function() {
                const input = [
                    "Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds.",
                    "Rudolph can fly 3 km/s for 15 seconds, but then must rest for 28 seconds."
                ];
                const [vixen, rudolph] = parse(input);
                const result = race([vixen, rudolph], 10);

                expect(result).to.be.an("array");
                expect(result[0]).to.eql({
                    name: vixen.name,
                    distance: vixen.speed * Math.min(vixen.flyTime, 10)
                });
                expect(result[1]).to.eql({
                    name: rudolph.name,
                    distance: rudolph.speed * Math.min(rudolph.flyTime, 10)
                });
            });
            
        });
        
        describe("reindeer", function() {
            
            beforeEach(function() {
                const input = [
                    "Vixen can fly 19 km/s for 7 seconds, but then must rest for 124 seconds."
                ];
                
                this.example = parse(input)[0];
            });

            it("should expect a description object", function() {
                expect(() => reindeer()).to.throw("You must provide a description object.");
            });
            
            it("should return an object with properties 'name', 'distance', and 'next'", function() {
                const result = reindeer(this.example);

                expect(result).to.be.an("object");
                expect(result.name).to.be.a("function");
                expect(result.distance).to.be.a("function");
                expect(result.next).to.be.a("function");
            });

            describe("name", function() {

                it("should return the name given on creation", function() {
                    const result = reindeer(this.example);

                    expect(result.name()).to.eq(this.example.name);
                });

            });
            
            describe("distance", function() {

                it("should initially return 0 if 'next' has never been called", function() {
                    const result = reindeer(this.example);

                    expect(result.distance()).to.eq(0);
                });

                it("should return the a distance equal to speed after calling 'next'", function() {
                    const result = reindeer(this.example);

                    result.next();
                    
                    expect(result.distance()).to.eq(this.example.speed);
                });

            });

            describe("next", function() {

                it("should increment the distance by the value of 'speed'", function() {
                    const result = reindeer(this.example);

                    result.next();
                    
                    expect(result.distance()).to.eq(this.example.speed);
                });

                it("should increment the distance by 'speed' x2 when called twice", function() {
                    const result = reindeer(this.example);

                    _.times(result.next, 2);
                    
                    expect(result.distance()).to.eq(this.example.speed * 2);
                });
                
                it("should stop moving the reindeer after calling more than the fly time", function() {
                    const result = reindeer(this.example);
                    const {flyTime, speed} = this.example;

                    _.times(result.next, flyTime + 1);
                    
                    expect(result.distance()).to.eq(flyTime * speed);
                });

                it("should start moving the reindeer after calling more than the rest time", function() {
                    const result = reindeer(this.example);
                    const {flyTime, speed, restTime} = this.example;

                    _.times(result.next, flyTime + restTime + 1);
                    
                    expect(result.distance()).to.eq((flyTime + 1) * speed);
                });
                
            });
            
        });

    });

});
