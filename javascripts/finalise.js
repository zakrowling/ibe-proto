$(document).on("click", ".show-guest-details", function() {
  $(".guest-form-details").addClass("is-active");
  $(".guest-details-expanded").fadeIn(500);
  $(".guest-details-collapsed").hide();
  scrollTo(".guest-form-details", 500);
});

$(document).on("click", ".show-payment-details", function() {
	$(".payment-form-details").addClass("is-active");
  $(".guest-details-expanded").fadeOut(500);
  $(".guest-details-collapsed").show();
  setTimeout(function() {
    $(".guest-form-details").addClass("is-collapsed");
    scrollTo(".payment-form-details", 0);
  }, 500);
});

$(document).on("keyup", "#credit-card-number", function() {
  $(".show-visa-card-only").addClass("hide-other-cards");
});