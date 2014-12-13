/// <reference path="lcars-components.ts" /><script async>

LcarsComponents.registerCustomLcarsElement("column", HTMLElement, {
    requiredAttributes: [ "col", "of", "align" ],
    
    createdCallback: function() {
        var col = parseInt(this.attr("col"));
        var num = parseInt(this.attr("of"));
        var align = this.attr("align");
        
        if (num != 24) {
            throw new Error("Column count must be 24 for now!");
        }
        
        if (col <= 0 || col > num) {
            throw new Error("Column number must be 0 < col < count");
        }
        
        //Add class for which type of column this is
        //TODO: Generate column width values on the fly, totally removing the need for an column LESS at all
        this.addClass("lcars-column-" + col + "-" + num);
        
        //Setup alignment
        if (align == "left") {
            this.addClass("lcars-left");
        } else if (align == "right") {
            this.addClass("lcars-right");
        } else if (align == "center") {
            this.addClass("lcars-center");
        } else {
            throw new Error("Columns must be aligned to either left, right or center");
        }
        
        //Contain content in between elbows
        var children = this.children("lcars-elbow");
        if (children.length > 2) {
            throw new Error("Column cannot have more than 2 elbows");
        } else if (children.length == 2) {
            var topElbow = children.first();
            var lastElbow = children.last();
        
            //Remove content
            var content = topElbow.nextUntil(lastElbow);
            content.detach();
            
            //Put it back inside an appropriate container
            var inner = $("<div></div>").addClass("lcars-column-inner-2");
            inner.append(content);
            
            topElbow.after(inner);
        } else if (children.length == 1) {
            //Single elbow setup
            throw new Error("Single elbow setups not yet supported");
        }
        else if (children.length == 0) {
            //Zero elbow setup
            return;
        }
    }
});