'use strict';

(function() {

  // visual grid: use 'g' key to toggle body class
  // var k = new Kibo();
  // k.down(['g'], function() {
  //   $('body').addClass('grid');
  // }).up('g', function() {
  //   $('body').removeClass('grid');
  // });

  // navigation
  // var menuToggle = $("#js-mobile-menu").unbind();
  // $("#js-navigation-menu").removeClass("show");

  // menuToggle.on("click", function(e) {
  //   e.preventDefault();
  //   $("#js-navigation-menu").slideToggle(function(){
  //     if($("#js-navigation-menu").is(":hidden")) {
  //       $("#js-navigation-menu").removeAttr("style");
  //     }
  //   });
  // });

  $('#main').smoothState();
  console.log('smoothstate');

})();