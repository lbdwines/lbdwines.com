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
            // HOME
            var homeFavorites = $('#home-favorites');
            if (homeFavorites.length > 0)
              homeFavorites.imagesLoaded( function() {
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

            // WINES
            var wines = $('#wines');
            if(wines.length > 0)
              wines.imagesLoaded( function() {
                var wines = $('.product');
                wines.fadeTo(400, 1);
                var breakouts = $('.breakout');
                var breakoutHeight = breakouts.eq(0).height();
                var productHeight = $('.product').first().height();
                var pad = (breakoutHeight - productHeight) / 2;
                breakouts.eq(0).prev().css({"margin-bottom": "0px", "padding-top": pad});
                breakouts.eq(1).next().css({"margin-bottom": "0px", "padding-top": pad});
                window.onresize = debounce(function(){
                  if ($(window).width() != windowWidth) {
                    var breakouts = $('.breakout');
                    var breakoutHeight = breakouts.eq(0).height();
                    var productHeight = $('.product').first().height();
                    var pad = (breakoutHeight - productHeight) / 2;
                    breakouts.eq(0).prev().css({"margin-bottom": "0px", "padding-top": pad});
                    breakouts.eq(1).next().css({"margin-bottom": "0px", "padding-top": pad});
                  }
                }, 100);
              });

            //
            var about = $('#about');
            if(about.length > 0)
              about.imagesLoaded( function() {
                var makerImageDiv = $('.winemaker .image');
                var makerImageDivHeight = makerImageDiv.height();
                var makerTextDiv = $('.winemaker .text');
                var makerTextDivHeight = $('.winemaker .text').height();
                if (makerTextDivHeight > makerImageDivHeight) {
                  var pad = (makerTextDivHeight - makerImageDivHeight) / 2;
                  makerImageDiv.css("padding-top", pad);
                  setTimeout(function(){
                    makerImageDiv.fadeTo(400, 1);
                    makerTextDiv.fadeTo(400, 1);
                  }, 100);
                } else {
                  var pad = (makerImageDivHeight - makerTextDivHeight) / 2;
                  makerTextDiv.css("padding-top", pad);
                  setTimeout(function(){
                    makerImageDiv.fadeTo(400, 1);
                    makerTextDiv.fadeTo(400, 1);
                  }, 100);
                }
                window.onresize = debounce(function(){
                  if ($(window).width() != windowWidth) {
                    var makerImageDiv = $('.winemaker .image');
                    var makerImageDivHeight = makerImageDiv.height();
                    var makerTextDiv = $('.winemaker .text');
                    var makerTextDivHeight = $('.winemaker .text').height();
                    var pad = 0;
                    if (makerTextDivHeight > makerImageDivHeight) {
                      pad = (makerTextDivHeight - makerImageDivHeight) / 2;
                      makerImageDiv.css("padding-top", pad);
                    } else {
                      pad = (makerImageDivHeight - makerTextDivHeight) / 2;
                      makerTextDiv.css("padding-top", pad);
                    }
                    console.log('resize about');
                  }
                }, 100);
              });


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


})();