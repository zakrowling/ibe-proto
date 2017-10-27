
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


// Guest initials on seatmap
$(document).on("click", ".seat.available", function() {

  var activeSeatmap = $(".seat-selector-nav .item").attr("data-seatmap-flight");
  var activeGuestInitials = $(".guest.is-selected .guest-initial").text();
  $(this).attr("data-guest-initials", activeGuestInitials);

  $(".seat[data-guest-initials=" + activeGuestInitials + "]").addClass("available");
  $(".seat[data-guest-initials=" + activeGuestInitials + "]").removeClass("selected");

  $(this).removeClass("available");
  $(this).addClass("selected");

  // Get seat number
  var numberInRow = $(this).prevAll().length - 1;
  var rowLetter = $(".row-letter:eq(" + numberInRow + ")" ).text();
  var rowNumber = $(this).parent(".row").find(".row-number").text();

  $(".guest.is-selected .guest-subtitle").text("Seat " + rowLetter + rowNumber);


  if ($(".guest.is-selected").hasClass("first")) {
    $(".guest.is-selected").next(".guest").addClass("is-selected");
    $(".guest.is-selected:first").removeClass("is-selected");
  } else {
    $(".guest.is-selected").prev(".guest").addClass("is-selected");
    $(".guest.is-selected.last").removeClass("is-selected");
  }

});


$(document).on("click", ".seat-selection-actions .save-seats", function() {
  if ($(".seatmap").is(".melbourne.is-active")) {
    $(".seatmap.is-active").next(".seatmap").addClass("is-active");
    $(".seatmap:first").removeClass("is-active");
    $(".seat-selector-nav .item").removeClass("is-active");
    $(".seat-selector-nav .item:nth-child(2)").addClass("is-active");
  } else {
    window.location.href = "customise.html?total=" + $("header .amount").text();
  }
});

$(document).on("click", ".seat-selection-actions .cancel-seats", function() {
  window.location.href = "customise.html?total=" + $("header .amount").text();
});




$(document).on("click", ".seat-selector-nav .item", function() {
  var getFlightSeatmap = $(this).attr("data-seatmap-flight");

  // Update tab
  $(".seat-selector-nav .item").removeClass("is-active");
  $(this).addClass("is-active");

  // Switch seatmap 
  $(".seatmap.is-active").removeClass("is-active");
  $(".seatmap." + getFlightSeatmap).addClass("is-active");

  $(".guest-subtitle").text("Select a seat");
});

// Guest panel
$(document).on("click", ".guest-details, .guest-initial", function() {
  $(".guest").removeClass("is-active is-selected");
  $(this).parent(".guest").addClass("is-active is-selected");
  $(this).find("guest-name").focus();

  $('html').bind('keypress', function(e){
    if (e.keyCode == 13){
      return false;
    }
  });
});

$(document).on("click", ".guest .btn", function() {
  $(".guest").removeClass("is-active");
  var getGuestName = $(this).parents(".guest").find(".guest-name").text();
  var getGuestInitials = getGuestName.match(/\b(\w)/g);

  if (getGuestName.length) {
    $(this).parents(".guest").find(".guest-subtitle").text("Select a seat");
  }

  $(this).parents(".guest").find(".guest-initial").text(getGuestInitials.join(''));
});
