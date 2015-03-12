/// <reference path="lcars-components.ts" /><script async>
/// <reference path="../lcars-variables.ts" /><script async>

LcarsComponents.registerCustomLcarsElement("row", HTMLDivElement, {
    requiredAttributes: [ "row", "of" ],
    
    createdCallback: function() {    
        var row = parseInt(this.attr("row"));
        var num = parseInt(this.attr("of"));
        
        if (row <= 0 || row > num) {
            throw new Error("Column number must be 0 < row <= count");
        }

        this.addClass("lcars-row-m-of-n");
        this.css("height", "calc(" + (row * 100 / num) + "% - " + (2 * lcars_config.column_padding_vertical) + "px)");
    }
});