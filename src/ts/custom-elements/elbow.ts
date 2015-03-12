/// <reference path="lcars-components.ts" /><script async>

LcarsComponents.registerCustomLcarsElement("elbow", HTMLDivElement, {
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
        
        var p = this.prev().length;
        var n = this.next().length;
        if (p == 0 && n == 0) {
            //It is indeterminate if this is a top or a bottom elbow, let's assume it's a top
            p = 0; n = 1;
        }
        
        if (p == 0) {
            this.addClass("lcars-top-elbow");
        } else if (n == 0) {
            this.addClass("lcars-bottom-elbow");
        } else {
            throw new Error("Elbow must be either first or last element within parent");
        }
    }
});