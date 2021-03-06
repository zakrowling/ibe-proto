// Delay load for HTML includes
setTimeout(function() {
  getTotalByParameter();
  updateExtrasByParameter();
  updateGuestDetails();
  getCurrentStep();
  resetFlightStrips();
}, 500);


function getParameterByName(name, url) {
  if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function updateParameterByName(param, newval, search) {
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');
    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}

function updateCartTotal(addToTotal) {
  var cartTotal = parseInt($("header .amount").text());
  var updateTotal = parseInt(addToTotal) + cartTotal;

  // Update the cart here
  $("header .amount").text(updateTotal);
  $(".header-cart").addClass("is-active");
}

function getTotalByParameter() {
  if (getParameterByName("total").length) {
    var fareTotal = parseInt(getParameterByName("total"));

    // Remove baggage from total to work out fares
    if (getParameterByName("baggage").length) {
      fareTotal -= parseInt(getParameterByName("baggage"));
      $(".total-bag-cost").text(getParameterByName("baggage"));
    }

    // Remove insurance from total to work out fares
    if (getParameterByName("insurance").length) {
      fareTotal -= parseInt(getParameterByName("insurance"));
       $(".total-insurance-cost").text(getParameterByName("insurance"));
    }

    var taxTotal = fareTotal / 100;
    var nonTaxFares = fareTotal - taxTotal;
    $(".amount").html(getParameterByName("total"));
    $(".amount.non-tax").html(nonTaxFares.toFixed(2));
    $(".amount.tax-only").html(taxTotal.toFixed(2));
  }
}

function updateGuestDetails() {
  if (getParameterByName("g1").length) {
    var createGuestInitials = getParameterByName("g1").match(/\b(\w)/g).join('');
    $(".guest:nth-child(1) .guest-initial, .guest:eq(0) .guest-disc").text(createGuestInitials);

    $(".guest:nth-child(1) .guest-name").text(getParameterByName("g1"));
    $(".guest:eq(0) .guest-name").attr("placeholder", getParameterByName("g1"));
    $(".guest:nth-child(1) .guest-subtitle").text("Velocity Red");
    $(".guest:nth-child(1) #guest-ffn1").val("123456789");
    $(".guest:eq(0) .input-ff").attr("placeholder", "123456789");
  }
  if (getParameterByName("g2").length) {
    var createGuestInitials = getParameterByName("g2").match(/\b(\w)/g).join('');
    $(".guest:nth-child(2) .guest-initial, .guest:eq(1) .guest-disc").text(createGuestInitials);

    $(".guest:nth-child(2) .guest-name").text(getParameterByName("g2"));
    $(".guest:eq(1) .guest-name").attr("placeholder", getParameterByName("g2"));
    $(".guest:nth-child(2) .guest-subtitle").text("Velocity Red");
    $(".guest:nth-child(2) #guest-ffn2").val("234567890");
    $(".guest:eq(1) .input-ff").attr("placeholder", "234567890");
  }

  // Check if guest panel has been used
  checkGuestPanelEditable()
}

function checkGuestPanelEditable() {
  var editGuestDetails = true;
  if (getParameterByName("g1")) {
    editGuestDetails = false;
    $(".guest").addClass("is-closed");
    $(".guest").removeClass("is-active");
    removeEditableGuestNames();
  } else {
    $(".guest:nth-child(1)").addClass("is-active");
    focusOnGuestName(1);
  }
}

function focusOnGuestName(guestOrder) {
  setTimeout(function() {
    $(".guest:nth-child(" + guestOrder + ") .guest-name").focus();
  }, 1000);
}

function removeEditableGuestNames() {
  setTimeout(function() {
    $(".guest .guest-name").attr("contenteditable", "false");
  }, 1000);
}

function updateExtrasByParameter() {
  if (getParameterByName("insurance") > 0){$(".extras-tile.travel-insurance").addClass("added")}
  if (getParameterByName("seat") == 1){$(".extras-tile.seating").addClass("added")}
  if (getParameterByName("baggage") > 0){$(".extras-tile.baggage").addClass("added")}
}

function getCurrentStep() {
  currentStep = $('body').attr("data-step-count");
  $(".step").removeClass("active");
  $(".step:nth-child(" + currentStep + ")").addClass("active");
}

function loadNextStep(pageName) {
  // Update cart total parameter
  var currentCartTotal = parseInt($("header .amount").text());
  var currentURLParameters = window.location.search;
  currentURLParameters = updateParameterByName("total", currentCartTotal, currentURLParameters);

  pageDelay = 2000;
  $("body").addClass("loading");
  setTimeout(function() {
    window.location = pageName + '.html' + currentURLParameters;
  }, pageDelay);
}

function scrollTo(element, speed) {
  $('html, body').animate({
    scrollTop: $(element).offset().top
  }, speed);
}