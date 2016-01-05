import { expect } from "chai";
import { title, parse, getConfigurations } from "./";
import _ from "lodash-fp";

describe(title, function() {

    describe("Part 1:", function() {

        describe("parse", function() {
            
            it("should return a list of numbers", function() {
                const input = ["15", "0", "123", "44", "32"].join("\n");
                const result = parse(input);

                expect(result).to.be.an("array");

                _.forEach((x) => expect(x).to.be.a("number"));
            });

            it("should return [1, 2, 3, 4], given '1\\n2\\n3\\n4'", function() {
                const input = ["1", "2", "3", "4"].join("\n");
                const result = parse(input);
                
                expect(result).to.eql([1, 2, 3, 4]);
            });
            
        });
        
        describe("getConfigurations", function() {

            it("should return an array of configurations", function() {
                const result = getConfigurations([1, 2, 3, 4, 5, 6]);

                expect(result).to.be.an("array");
            });

            it("should configuration arrays containing 3 groups", function() {
                const result = getConfigurations([1, 2, 3, 4, 5, 6]);

                expect(result).to.be.an("array");
                
                _.forEach((configuration) => {
                    expect(configuration).to.be.an("array");
                    expect(configuration.length).to.eq(3);

                    _.forEach((group) => {
                        expect(group).to.be.an("array");
                        expect(group.length).to.be.at.least(1);
                    }, configuration);
                }, result);
            });

            
            
        });

    });

});
