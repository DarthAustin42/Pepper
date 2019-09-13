function onResizeFunction() {
  console.log("HEYO THERE");
  console.log($(document).width());
  var newWidth = $(document).width() * 0.07;
  $(".cardImg").css( "width", newWidth);
}
