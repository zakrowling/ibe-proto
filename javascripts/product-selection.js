var pageDelay = 2000;
var selectFlights = 2;
var flightCount = 0;


$(document).on("click", ".flight-strip", function() {
  $(".select-flight").hide();
  $(this).parents(".select-flight").next("div").show();

  // Update faretabs with selected flight strip
  fromPrice = $(this).find(".from-price i").text();
  $(".faretab-getaway .fare-box i").text(fromPrice);
  $(".faretab-getaway .btn").attr("data-fare-amount", fromPrice);

  departHour = $(this).find(".depart i").text();
  $(".select-inclusions-title i").text(departHour);

  // Reset flight strip
  $(".faretab").removeClass("is-active");
  $(".faretab-getaway").addClass("is-active");
  scrollTo("body", 1);

});

$(document).on("click", ".faretab .btn", function() {
  setTimeout(function() {
    $(".select-flight-inclusions").hide();
    flightCount++;
    // If next step exists, go there
    if (flightCount < 2) {
      $(".select-flight-inclusions").next("div").show();
    } else {
      loadNextStep('customise');
    }

    $(".header-cart").removeClass("is-active");
    scrollTo("body", 1);
  }, pageDelay);

  // Update cart with transition
  addToCart = $(this).attr("data-fare-amount");
  updateCartTotal(addToCart);
  return false;
});

$(document).on("click", ".faretab", function() {
  $(".faretab").removeClass("is-active");
  $(this).addClass("is-active");
  if ($(".faretab.is-active").hasClass("faretab-elevate")) {
    $(".icons").attr("data-fare-type","elevate");
    $(".icon:nth-child(5)").addClass("included");
    $(".icon:nth-child(5)").removeClass("paid");
    $(".icon:nth-child(6)").addClass("paid");
    $(".icon:nth-child(6), .icon:nth-child(7)").removeClass("included");
  }
  if ($(".faretab.is-active").hasClass("faretab-freedom")) {
    $(".icons").attr("data-fare-type","freedom");
    $(".icon:nth-child(5), .icon:nth-child(6), .icon:nth-child(7)").addClass("included");
    $(".icon:nth-child(5), .icon:nth-child(6)").removeClass("paid");
    $(".icon:nth-child(7)").addClass("included");
  }
  if ($(".faretab.is-active").hasClass("faretab-getaway")) {
    $(".icons").attr("data-fare-type","getaway");
    $(".icon:nth-child(5), .icon:nth-child(6)").removeClass("included");
    $(".icon:nth-child(5)").addClass("paid");
    $(".icon:nth-child(7)").removeClass("included");
  }
});


// Explore fares

$(document).on("click", ".select-flight-inclusions .explore, .select-flight-inclusions .icon", function() {
  $(".select-flight-inclusions .explore-overlay").fadeIn(500);
});

$(document).on("click", ".explore-overlay", function() {
  $(".select-flight-inclusions .explore-overlay").fadeOut(500);
});

function resetFlightStrips() {
  var fromPrice = 105;
  var departHour = 4;
  var totalFlights = $(".flight-strips .flight-strip-group").length + 1;
  for (count = 1; count < totalFlights; count++) {
    departHour += 1;
    fromPrice += 10;
    $(".flight-strips .flight-strip-group:nth-child(" + count + ") .from-price strong i").text(fromPrice);
    $(".flight-strips .flight-strip-group:nth-child(" + count + ") .depart i").text(departHour);
    $(".flight-strips .flight-strip-group:nth-child(" + count + ") .arrive i").text(departHour + 2);
  }
}