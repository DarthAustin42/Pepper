function onResizeFunction() {
  console.log("HEYO THERE");
  console.log($(document).width());
  console.log($(document).height());
  var newWidth = $(document).width() * 0.07;
  var newHeight = $(document).height() * 0.0972461

  if (newWidth < newHeight) {
    $(".cardImg").css( "width", newWidth);
  }
  else {
    $(".cardImg").css( "height", newHeight);
  }
}
