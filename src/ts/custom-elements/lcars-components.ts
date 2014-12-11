module LcarsComponents {
    export function registerCustomLcarsElement(name : string, baseElement, options) {
        var proto = Object.create(baseElement.prototype);

        //Error handler for when an error is detected in layout
        //TODO: replace the offending element with a big red THIS ELEMENT IS BROKEN element
        function errorHandler($el, msg : string) {
            throw new Error("todo: layout non conformant error handling. Msg: " + msg);
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
                try {
                    options.createdCallback.call($self);
                } catch (err) {
                    errorHandler($self, err.message);
                }
            }
        };

        document.registerElement('lcars-' + name, { prototype: proto });
    }
}