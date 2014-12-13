module LcarsComponents {
    // Register a new custom element
    // Parameters:
    // - name : string -> The element will be called <lcars-name>
    // - baseElement -> A type of element to extend, if null then defaults to a plain HTMLElement
    // - options -> An object of named options:
    // {
    //  requiredAttributes : string[] -> attributes which are required on this element, if not present an error will be displayed
    //  internalClasses : string[] -> Classes which will be added to the element
    //  createdCallback : function() -> A function which will be called. 'this' will be set to a jQuery object of the element being created
    // }
    export function registerCustomLcarsElement(name : string, baseElement, options) {
        if (baseElement == null) {
            baseELement = HTMLElement;
        }
        var proto = Object.create(baseElement.prototype);

        //Error handler for when an error is detected in layout
        //TODO: replace the offending element with a big red THIS ELEMENT IS BROKEN element
        function errorHandler($el, msg : string) {
            throw new Error("TODO: layout non conformant error. Msg: " + msg);
        }
        
        proto.createdCallback = function() {
            var $self = $(this);
            
            //Check for required attributes
            if (options.requiredAttributes && $.isArray(options.requiredAttributes)) {
                $.each(options.requiredAttributes, function(index, value) {
                    if ($self.attr(value) === undefined) {
                        errorHandler($self, "Missing require attribute: '" + value + "'");
                    }
                });
            }
            
            //Apply classes
            if (options.internalClasses && $.isArray(options.internalClasses)) {
                $.each(options.internalClasses, function(index, value) {
                    $self.addClass(value);
                });
            }

            //Finally hand back control to the caller code
            if (options.createdCallback && typeof(options.createdCallback) === "function") {
                //try {
                    options.createdCallback.call($self);
                //} catch (err) {
                //    errorHandler($self, err.message);
                //}
            }
        };

        document.registerElement('lcars-' + name, { prototype: proto });
    }
}