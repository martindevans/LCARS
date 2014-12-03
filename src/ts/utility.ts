// check if lcars-no-alt class is on the document body
// if so then disable right click on page
if(document.body.getAttribute('class').indexOf("lcars-no-alt") > -1) {
    document.body.setAttribute('oncontextmenu', 'return false');

    document.onmousedown = function(event) {
        if(event.button == 2) {
            return false;
        }
    };
}
