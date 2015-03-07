/// <reference path="lcars-components.ts" /><script async>

LcarsComponents.registerCustomLcarsElement("row", HTMLDivElement, {
    requiredAttributes: [ "row", "of" ],
    
    createdCallback: function() {    
        var row = parseInt(this.attr("row"));
        var num = parseInt(this.attr("of"));
        
        if (num != 12) {
            throw new Error("Row count must be 12 for now!");
        }
        
        if (row <= 0 || row > num) {
            throw new Error("Column number must be 0 < row <= count");
        }
        
        //Add class for which type of row this is
        //TODO: Generate row height values on the fly, totally removing the need for a row LESS at all
        this.addClass("lcars-row-" + row + "-" + num);
    }
});