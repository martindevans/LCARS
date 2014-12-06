// check if lcars-no-alt class is on the document body
// if so then disable right click on page
$(function() {
    var $body = $(document.body);
    FastClick.attach($body);
    if ($body.hasClass("lcars-no-alt")) {
        $body.attr("oncontextmenu", "return false");
    }

    document.onmousedown = function(event) {
        if (event.button == 2) {
            return false;
        }
    };
});
