$( document ).ready(function() {
  var total = parseInt(0, 10);
  var colors = ["#FF9900","#CC99CC","#9999CC","#CC6666","#FFCC99","#9999FF","#FF9966","#CC6699"];
  $('body').children("div[class^='row-']").each(function() {
    var rand = Math.floor(Math.random()*colors.length);
    $(this).css('width', '100%');
    $(this).css('background-color', colors[rand]);
    var m = this.className.match(/row-(\d+)/);
    if (m) {
      parameter = m[1];
      total = total + parseInt(parameter, 10);
    }
  });
  $('body').children("div[class^='row-']").each(function() {
    var m = this.className.match(/row-(\d+)/);
    if (m) {
      parameter = parseInt(m[1], 10);
      height = (100 / total) * parameter;
      $(this).css('height', height + '%');
    }
  });
});
