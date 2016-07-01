'use strict';

(function() {

  prep();

  // this function contains others that need to run on every smoothsState page change
  function prep(){

    //
    // 1 these run at every window width
    //

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

    //
    //  2 - these run in an enquire conditional
    //

    // mobile
    enquire.register("screen and (max-width: 768px)", {
        match : function() {

          $(function() {
            // on load
            // console.log('up to 768px wide');

            // on resize
          });
        },
        unmatch : function() {
        }
      })
      // desktop
      .register("screen and (min-width: 769px)", {
        match : function() {
          var windowWidth = $(window).width(); // for resize below
          $(function() {
            //
            // on load
            //

            // homepage
            $('#home-favorites').not('.processed').imagesLoaded( function() {
              var favImage = $('#favImage');
              var favImageHeight = favImage.height();
              var favText = $('.favorites .wrapper');
              var makerImage = $('#makerImage');
              var makerImageHeight = makerImage.height();
              var makerText = $('.winemaker .wrapper');
              $(this).addClass('processed');

              favImage.parent().prev().height(favImageHeight);
              makerImage.parent().next().height(makerImageHeight);

              setTimeout(function(){
                favText.fadeTo(400, 1);
                makerText.fadeTo(400, 1);
              }, 100);
            });

            //
            // on resize
            //

            // homepage
            window.onresize = debounce(function(){
              if ($(window).width() != windowWidth) {
                var favImage = $('#favImage');
                var favImageHeight = favImage.height();
                var makerImage = $('#makerImage');
                var makerImageHeight = makerImage.height();
                favImage.parent().prev().height(favImageHeight);
                makerImage.parent().next().height(makerImageHeight);
              }
            }, 100);

          });
        },
        unmatch : function() {
        }
      });



  } // end of prep()



  // smoothstate
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

    // debounce
    // https://davidwalsh.name/javascript-debounce-function
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

})();