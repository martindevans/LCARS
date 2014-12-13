/// <reference path="lcars-components.ts" /><script async>

LcarsComponents.registerCustomLcarsElement("elbow", HTMLElement, {
    requiredAttributes: [ "shape" ],
    
    createdCallback: function() {
        var shape = this.attr("shape");
        if (shape == "round") {
            this.addClass("lcars-elbow-round");
        } else if (shape == "square") {
            this.addClass("lcars-elbow-square");
        } else {
            throw new Error("Elbow must be either square or round");
        }
        
        if (this.prev().length == 0) {
            this.addClass("lcars-top-elbow");
        } else if (this.next().length == 0) {
            this.addClass("lcars-bottom-elbow");
        } else {
            //throw new Error("Elbow must be either first or last element within parent");
        }
    }
});