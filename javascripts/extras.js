
$(document).on("click", ".extras-tile", function() {
  $(".customise-trip").hide();
  scrollTo("body", 1);
  $(".seating-screen").show();
});

// Aircraft section indicator
var aircraftPosition = 0;
$(window).scroll(function(){
  var vScroll = $(window).scrollTop();
  var positionSpeed = 1;

  if (vScroll < 200) {
    $(".aircraft-section-indicator").animate({left: '0'}, positionSpeed);
  }
  if (vScroll > 200 && vScroll < 299) {
    $(".aircraft-section-indicator").animate({left: '15'}, positionSpeed);
  }
  if (vScroll > 300 && vScroll < 399) {
    $(".aircraft-section-indicator").animate({left: '30'}, positionSpeed);
  }
  if (vScroll > 400 && vScroll < 499) {
    $(".aircraft-section-indicator").animate({left: '45'}, positionSpeed);
  }
  if (vScroll > 500 && vScroll < 599) {
    $(".aircraft-section-indicator").animate({left: '60'}, positionSpeed);
  }
  if (vScroll > 600 && vScroll < 699) {
    $(".aircraft-section-indicator").animate({left: '75'}, positionSpeed);
  }
  if (vScroll > 700 && vScroll < 799) {
    $(".aircraft-section-indicator").animate({left: '90'}, positionSpeed);
  }
  if (vScroll > 800 && vScroll < 899) {
    $(".aircraft-section-indicator").animate({left: '105'}, positionSpeed);
  }
  if (vScroll > 900 && vScroll < 999) {
    $(".aircraft-section-indicator").animate({left: '120'}, positionSpeed);
  }
  if (vScroll > 1000 && vScroll < 1099) {
    $(".aircraft-section-indicator").animate({left: '135'}, positionSpeed);
  }
  aircraftPosition = vScroll;
});

