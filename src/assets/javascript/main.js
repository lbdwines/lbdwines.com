'use strict';

(function() {

  // visual grid: use 'g' key to toggle body class
  var k = new Kibo();
  k.down(['g'], function() {
    $('body').addClass('grid');
  }).up('g', function() {
    $('body').removeClass('grid');
  });

  // navigation
  $(window).resize(function() {
    var more = document.getElementById("js-navigation-more");
    if ($(more).length > 0) {
      var windowWidth = $(window).width();
      var moreLeftSideToPageLeftSide = $(more).offset().left;
      var moreLeftSideToPageRightSide = windowWidth - moreLeftSideToPageLeftSide;

      if (moreLeftSideToPageRightSide < 330) {
        $("#js-navigation-more .submenu .submenu").removeClass("fly-out-right");
        $("#js-navigation-more .submenu .submenu").addClass("fly-out-left");
      }

      if (moreLeftSideToPageRightSide > 330) {
        $("#js-navigation-more .submenu .submenu").removeClass("fly-out-left");
        $("#js-navigation-more .submenu .submenu").addClass("fly-out-right");
      }
    }
  });

    var menuToggle = $("#js-mobile-menu").unbind();
    $("#js-navigation-menu").removeClass("show");

    menuToggle.on("click", function(e) {
      e.preventDefault();
      $("#js-navigation-menu").slideToggle(function(){
        if($("#js-navigation-menu").is(":hidden")) {
          $("#js-navigation-menu").removeAttr("style");
        }
      });
    });


})();