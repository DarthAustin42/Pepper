function onResizeFunction() {
  console.log($(document).width());
  console.log($(document).height());
  var docWidth = $(document).width();
  var docHeight = $(document).height();
  var newWidth = docWidth * 0.06;
  var newHeight = docHeight * 0.1605643;

  if (docWidth < docHeight) {
    $(".cardImg").css( "width", newWidth);
    newHeight = newWidth * 1.3893805;
    $(".cardImg").css( "height", newHeight);
  }
  else {
    $(".cardImg").css( "height", newHeight);
    newWidth = newHeight * 0.7197452;
    $(".cardImg").css( "width", newWidth);
  }
}
