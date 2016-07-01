'use strict';

(function() {

  prep();

  // this function contains others that need to run on every smoothsState page change
  function prep(){
    // visual grid
    var k = new Kibo();
    k.down(['g'], function() {
      $('body').addClass('grid');
    }).up('g', function() {
      $('body').removeClass('grid');
    });

    // nav menu
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



  } // end of prep()




  var $page = $('#main'),
    options = {
      blacklist: '.no-smoothState',
      debug: true,
      prefetch: true,
      cacheLength: 4,
      onStart: {
        duration: 250, // Duration of our animation
        render: function ($container) {
          // Add your CSS animation reversing class
          $container.addClass('is-exiting');
          // Restart your animation
          smoothState.restartCSSAnimations();
        }
      },
      onReady: {
        duration: 0,
        render: function ($container, $newContent) {
          // Remove your CSS animation reversing class
          $container.removeClass('is-exiting');
          // Inject the new content
          $container.html($newContent);
        }
      },
      onAfter: function() {
        prep();
      }
    },
    smoothState = $page.smoothState(options).data('smoothState');



})();