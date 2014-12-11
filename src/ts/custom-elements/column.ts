/// <reference path="lcars-components.ts" /><script async>

//todo: rather than polluting the global namespace this should be inside a module!
var allowedColumnShoulderShapeTypes = ["square", "none", "round"];

function createColumnElbow(cls, type, label) {
    if (allowedColumnShoulderShapeTypes.indexOf(type) === -1) {
        throw new Error("Column " + cls + " elbow must be styled either square, round or none");
    }

    var el = $('<div></div>')
        .addClass("lcars-" + cls + "-elbow")
        .toggleClass('lcars-elbow-square', type === "square")
        .toggleClass('lcars-elbow-round', type === "round")
        .toggleClass('lcars-elbow-none', type === "none");
        
    if (label) {
        el.append("<h1></h1>")
            .text(label);
    }
    
    return el;
}

LcarsComponents.registerCustomLcarsElement("column", HTMLElement, {
    requiredAttributes: [ "col", "num", "align" ],
    
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
        
        // the inside of a column looks like this:
        //  <div class="lcars-top-elbow lcars-elbow-square"></div>
        //  <div class="lcars-column-inner-2">Content goes here</div>
        //  <div class="lcars-bottom-elbow lcars-elbow-round"></div>
        // i.e. a top elbow (maybe), content, and a buttom elbow (maybe)
        //Pull up the content from the custom element and place it inside the column inner, with the appropriate elbow elements
        var topElbow = this.attr("elbow-top") || "none";
        var topLabel = this.attr("top-label") || "";
        
        var bottomElbow = this.attr("elbow-bottom") || "none";
        var bottomLabel = this.attr("bottom-label") || "";
        
        var content = this.children().clone();
        this.empty();
        
        var count = (topElbow !== "none" ? 1 : 0) + (bottomElbow !== "none" ? 1 : 0);
        
        if (topElbow !== "none") {
            this.append(createColumnElbow("top", topElbow, topLabel));
        }
        
        var innerContent = $('<div></div>').addClass("lcars-column-inner-" + count);
        innerContent.append(content);
        this.append(innerContent);
            
        if (bottomElbow !== "none") {
            this.append(createColumnElbow("bottom", bottomElbow, bottomLabel));
        }
    }
});