// Show each extras screen
$(document).on("click", ".extras-tile", function() {
  var getExtrasTile = $(this).attr("data-extras-tile");
  $(".customise-trip").hide();
  scrollTo("body", 1);
  $("." + getExtrasTile + "-screen").show();
});


// =======================
// Seating screen
// =======================

// Aircraft section indicator
var aircraftPosition = 0;
$(window).scroll(function(){
  var vScroll = $(window).scrollTop();
  var positionSpeed = 1;

  // Manually set scroll position
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
var seatCount = 0;
$(document).on("click", ".seat.available", function() {
  seatCount++;

  var activeSeatmap = $(".seat-selector-nav .item").attr("data-seatmap-flight");
  var activeGuestInitials = $(".guest.is-selected .guest-initial").text().substr(0, 2);
  $(this).attr("data-guest-initials", activeGuestInitials);

  $(".seat[data-guest-initials=" + activeGuestInitials + "]").addClass("available");
  $(".seat[data-guest-initials=" + activeGuestInitials + "]").removeClass("selected");

  $(this).removeClass("available");
  $(this).addClass("selected");

  // Get seat number
  var numberInRow = $(this).prevAll().length - 1;
  var rowLetter = $(".row-letter:eq(" + numberInRow + ")" ).text();
  var rowNumber = $(this).parent(".row").find(".row-number").text();

  $(".guest.is-selected .guest-subtitle").text("Sitting in seat " + rowLetter + rowNumber);


  if (seatCount == 1) {
    $(".guest.is-selected").next(".guest").addClass("is-selected");
    $(".guest.is-selected:first").removeClass("is-selected");
  } else {
    $(".guest.first").addClass("is-selected");
    $(".guest.is-selected.last").removeClass("is-selected");
    seatCount = 0;
  }

});


$(document).on("click", ".seat-selection-actions .save-seats", function() {

  // Scroll to top
  scrollTo("body", 500);

  if ($(".seatmap").is(".melbourne.is-active")) {
    $(".seatmap.is-active").next(".seatmap").addClass("is-active");
    $(".seatmap:first").removeClass("is-active");
    $(".seat-selector-nav .item").removeClass("is-active");
    $(".seat-selector-nav .item:nth-child(2)").addClass("is-active");
  } else {
    var currentURLParameters = window.location.search;
    var g1Name = $(".guest:nth-child(1) .guest-name").text();
    var g2Name = $(".guest:nth-child(2) .guest-name").text();
    currentURLParameters = updateParameterByName("g1", g1Name, currentURLParameters);
    currentURLParameters = updateParameterByName("g2", g2Name, currentURLParameters);
    currentURLParameters = updateParameterByName("seat", 1, currentURLParameters);

    pageDelay = 2000;
    $("body").addClass("loading");
    setTimeout(function() {
      window.location = 'customise.html' + currentURLParameters;
    }, pageDelay);

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

  // Update guest panel to make first active
  $(".guest").removeClass("is-active");
  $(".guest:nth-child(1)").addClass("is-selected");
});

// Guest panel
$(document).on("click", ".guest-details, .guest-initial", function() {
  if (editGuestDetails) {
    $(".guest").removeClass("is-active is-selected");
    $(this).parent(".guest").addClass("is-active is-selected");
    $(this).find("guest-name").focus();
  }

  // Disable enter key
  $('html').bind('keypress', function(e){
    if (e.keyCode == 13){ return false; }
  });
});

var guestNameCount = 0;
$(document).on("click", ".guest .btn", function() {

  guestNameCount++;

  $(".guest").removeClass("is-active");

  if (guestNameCount == 1) {
    // Make sure this panel never reopens
    $(".guest").removeClass("is-active is-selected");
    $(this).parents(".guest").addClass("is-closed");
    $(this).parents(".guest").next(".guest").addClass("is-active is-selected");
    focusOnGuestName(2);
  } else {
    // Remove seatmap overlay
    $(".seating-screen").removeClass("guest-details-required");
    editGuestDetails = false;

    // Make first guest selected
    $(".guest:nth-child(2)").removeClass("is-active is-selected");
    $(".guest:nth-child(1)").addClass("is-selected");
    $(".guest-subtitle").text("Select a seat");
    focusOnGuestName(0);
  }

  // Get guest details
  var getGuestName = $(this).parents(".guest").find(".guest-name").text();
  var getGuestInitials = getGuestName.match(/\b(\w)/g);

  if (getGuestName.length) {
    $(this).parents(".guest").find(".guest-subtitle").text("Guest name saved");
  }

  $(this).parents(".guest").find(".guest-initial").text(getGuestInitials.join(''));
});




// =======================
// Baggage screen
// =======================

var bagLimit = 5;
var bagBaseCost = 35;
var bagTotalCost = 0;
var totalBagCount = 0;

function updateBaggage(bagTotalCost, bagTotal, bagFlight) {
  $(".baggage-selector." + bagFlight).find(".count").text(bagTotal);
  if (bagTotalCost) {
    $(".baggage-selector." + bagFlight).next(".baggage-charge").find(".amount-message").text('$' + bagTotalCost + '.00 will be added');
  } else {
    $(".baggage-selector." + bagFlight).next(".baggage-charge").find(".amount-message").text('No extra cost');
    $(".baggage-selector." + bagFlight).find(".count-baggage").addClass('none');
    $(".baggage-selector." + bagFlight).find(".remove-baggage").addClass('disabled');
  }
  if (bagTotal == bagLimit) {
    $(".baggage-selector." + bagFlight).find(".add-baggage").addClass('disabled');
  }
}

// Add baggage
$(document).on("click", ".add-baggage", function() {

  var bagTotal = parseInt($(this).parent(".baggage-selector").find(".count").text());
 
  // Update total bag count
  totalBagCount += 1;
  var totalBagCost = totalBagCount * bagBaseCost;
  $(".total-line-items .total-bag-count").text(totalBagCount);
  $(".total-line-items .total-bag-cost").text(totalBagCost);


  if (bagTotal < bagLimit) {
    $(this).parent(".baggage-selector").find(".remove-baggage").removeClass('disabled');
    $(this).parent(".baggage-selector").find(".count-baggage").removeClass('none');
    bagTotal++;
    bagTotalCost = bagBaseCost * bagTotal;
    bagFlight = $(this).parent(".baggage-selector").attr("data-bag-flight");
    updateBaggage(bagTotalCost, bagTotal, bagFlight);
  }
});

// Remove baggage
$(document).on("click", ".remove-baggage", function() {

  var bagTotal = parseInt($(this).parent(".baggage-selector").find(".count").text());

  // Update total bag count
  totalBagCount -= 1;
  var totalBagCost = totalBagCount * bagBaseCost;
  $(".total-line-items .total-bag-count").text(totalBagCount);
  $(".total-line-items .total-bag-cost").text(totalBagCost);

  if (bagTotal) {
    $(this).parent(".baggage-selector").find(".add-baggage").removeClass('disabled');
    bagTotal--;
    bagTotalCost -= bagBaseCost;
    bagFlight = $(this).parent(".baggage-selector").attr("data-bag-flight");
    updateBaggage(bagTotalCost, bagTotal, bagFlight);
  }
});


// Save baggage
$(document).on("click", ".save-baggage", function() {
  var currentURLParameters = window.location.search;
  var totalBaggageCost = parseInt($(".baggage-screen .total-bag-cost").text());
  var newCartTotal = totalBaggageCost + parseInt($("header .amount").text());

  currentURLParameters = updateParameterByName("baggage", totalBaggageCost, currentURLParameters);
  currentURLParameters = updateParameterByName("total", newCartTotal, currentURLParameters);

  // Update cart with baggage
  updateCartTotal(totalBaggageCost);

  pageDelay = 2000;
  $("body").addClass("loading");
  setTimeout(function() {
    window.location = 'customise.html' + currentURLParameters;
  }, pageDelay);
});




// =======================
// Travel Insurance screen
// =======================

// Save insurance tier
$(document).on("click", ".travel-insurance-tiers .btn", function() {
  var currentURLParameters = window.location.search;
  var insuranceCost = parseInt($(this).attr("data-fare-amount"));
  var newCartTotal = insuranceCost + parseInt($("header .amount").text());

  currentURLParameters = updateParameterByName("insurance", insuranceCost, currentURLParameters);
  currentURLParameters = updateParameterByName("total", newCartTotal, currentURLParameters);

  // Update cart with transition
  updateCartTotal(insuranceCost);

  pageDelay = 2000;
  $("body").addClass("loading");
  setTimeout(function() {
    window.location = 'customise.html' + currentURLParameters;
  }, pageDelay);
});