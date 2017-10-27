// Delay load for HTML includes
setTimeout(function() {
  updateTotalByParameter();
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

function updateCartTotal(addToTotal) {
  var cartTotal = parseInt($("header .amount").text());
  var updateTotal = parseInt(addToTotal) + cartTotal;

  // Update the cart here
  $("header .amount").text(updateTotal);
}

function updateTotalByParameter() {
  if (getParameterByName("total").length) {
    var taxTotal = parseInt(getParameterByName("total")) / 100;
    var nonTaxTotal = getParameterByName("total") - taxTotal
    $(".amount").html(getParameterByName("total"));
    $(".amount.non-tax").html(nonTaxTotal.toFixed(2));
    $(".amount.tax-only").html(taxTotal.toFixed(2));
  }
}

function getCurrentStep() {
  currentStep = $('body').attr("data-step-count");
  $(".step").removeClass("active");
  $(".step:nth-child(" + currentStep + ")").addClass("active");
}

function scrollTo(element, speed) {
  $('html, body').animate({
    scrollTop: $(element).offset().top
  }, speed);
}