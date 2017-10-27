$(document).on("scroll", function() {
	var topScroll = $(document).scrollTop();
	if (topScroll > 128) {
		$(".header").addClass("sticky");
		$(".mini-calendar").removeClass("is-active");
	} else {
		$(".header").removeClass("sticky");
	}

  if (topScroll > 600) {
    $("body.finalise-booking .component-header").removeClass("hide-search-cart");
  } else {
    $("body.finalise-booking .component-header").addClass("hide-search-cart");
  }

});

$(document).on("click", ".header .header-cart", function() {
  $(".header-shopping-cart").toggleClass("is-active");
  $("body").toggleClass("cart-expanded");
});

$(document).on("click", ".header-shopping-cart", function() {
  $(".header-shopping-cart").removeClass("is-active");
  $("body").removeClass("cart-expanded");
});


$(document).on("click", ".mini-calendar-toggle", function() {
	$(".mini-calendar").toggleClass("is-active");
});


function loadNextStep(pageName) {
  pageDelay = 2000;
  $("body").addClass("loading");
  setTimeout(function() {
    window.location = pageName + '.html'+window.location.search
  }, pageDelay);
}