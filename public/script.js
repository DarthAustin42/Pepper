function onResizeFunction() {
  var docWidth = $(document).width();
  var docHeight = $(document).height();
  var deck13Width = $("#deck3").width();

  console.log(docWidth);
  console.log(deck13Width);

  var newWidth = docWidth * 0.06;
  var newHeight = docHeight * 0.1605643;

  var deck3LeftLoc = ((docWidth - deck13Width) / 2);

  console.log(deck3LeftLoc);

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

  $("#deck3").css( "left", deck3LeftLoc );
}
