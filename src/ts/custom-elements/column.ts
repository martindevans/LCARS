/// <reference path="lcars-components.ts" /><script async>

LcarsComponents.registerCustomLcarsElement("column", HTMLDivElement, {
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
        
        //Helper to host a selection of content from it's current position in the DOM into an lcars-column-inner-N container element next to an elbow
        function hoistContent(elbow, position, shoulderCount, content) {
            content.detach();
            elbow[position]($("<div></div>").addClass("lcars-column-inner-" + shoulderCount).append(content));
        }
        
        //Move content into proper container sibling of elbow(s)
        var shoulders = this.children("lcars-elbow");
        if (shoulders.length > 2) {
            throw new Error("Column cannot have more than 2 elbows");
        } else if (shoulders.length == 2) {
            //Two elbows get all the content between the two elbows and detach it from the parent.
            //Then reinsert this content back into an appropriately sized lcars-column-inner-N classed element
        
            var topElbow = shoulders.first();
            var lastElbow = shoulders.last();

            hoistContent(
                topElbow,
                "after",
                2,
                topElbow.nextUntil(lastElbow)
            );
            
        } else if (shoulders.length == 1) {
            //Single elbow, but is it at the top or the bottom?
            var previous = shoulders.prevAll();
            var next = shoulders.nextAll();
            if (previous.length == 0 && next.length == 0) {
                throw new Error("Indeterminate if shoulder is top or bottom shoulder (no sibling elements)");
            }
            
            if (previous.length == 0) {
                //Single top elbow
                hoistContent(shoulders, "after", 1, next)
            } else if (next.length == 0) {
                //Single bottom elbow
                hoistContent(shoulders, "before", 1, previous)
            } else {
                throw new Error("Shoulder must be last or first element in parent");
            }
        }
        else if (shoulders.length == 0) {
            //Zero elbows
            return;
        }
    }
});