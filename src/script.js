function onResizeFunction() {
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
  var deck13Width = newWidth * 6;

  var deck3LeftLoc = ((docWidth - deck13Width) / 2);

  $("#deck3").css( "left", deck3LeftLoc );
  console.log("HEYO");
}

function grow() {
  document.getElementById("zoomID").style.transform = "scale(1.5)";
}
function normal() {
  document.getElementById("zoomID").style.transform = "scale(1.0)";
}
function shrink() {
  document.getElementById("zoomID").style.transform = "scale(.5)";
  console.log("SMALL");
}
