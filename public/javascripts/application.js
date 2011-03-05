// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function() {

  // main navigation hover event
  $('#mainnav li').hover(function() {
      $(this).stop(true)
             .animate({height: '80px'}, {duration: 500, easing: 'easeOutBounce'});
    }, function() {
      $(this).stop(true)
             .animate({height: '20px'}, {duration: 500, easing: 'easeOutCirc'});
  });
  
  // sidebar navigation hover event
//  $('#sidenav li').hover(function() {
//    $(this).animate({paddingRight: '+=15px'}, 200);
//  }, function() {
//    $(this).animate({paddingRight: '-=15px'}, 200);
//  });
  
  // hide all accordian divs but the first one
  $('#bio > div').hide();
  $('#bio > div:first').show();
  
  $('#bio > h3').click(function() {
    $('#bio > div:visible').slideUp('slow');
    $(this).next().animate({'height': 'toggle'}, 'slow');
  });
  
  // make sidebar navigation follows
  $(window).scroll(function() {
    $('#sidenav').stop()
                 .animate({top: $(document).scrollTop()}, 'slow', 'easeOutBack');
  });
  
  // animate scroll to top when clicking a link
  $('a[href=#top]').click(function() {
    $('body').animate({scrollTop: 0}, 'slow');
    return false; // Cancel default link action
  });
  
  // show site welcome message for 5 seconds
  // flashMessage('Welcome to jQuery world!');
  
  // swap stylesheet when resize browser
  styleSheetToggle();
  $(window).resize(styleSheetToggle);
  
  // delete a parent element when clicking a link
  $('a.xparent').click(function() {
    $(this).parent().fadeOut('slow');
    return false;
  });
  
  // show overlay lightbox when clicking a link
  $('a.lightbox').click(function() {
    // hide scrollbars!
    $('body').css('overflow-y', 'hidden');
    
    $('<div id="lightbox_overlay"></div>')
      .css('top', $(document).scrollTop())
      .css('opacity', 0)
      .animate({opacity: 0.8}, 'slow')
      .appendTo('body');
    
    $('<div id="lightbox_container"></div>')
      .hide()
      .appendTo('body');
    
    // copy image source from clicked link
    // when loading is done, fire positionLightboxImage() function
    $('<img />')
      .attr('src', $(this).attr('href'))
      .load(function() { positionLightboxImage(); })
      .click(function() { removeLightbox(); })
      .appendTo('#lightbox_container');
    
    return false;
  });
  
  // bind colorbox photo gallery
  $('a[rel="celeb"]').fancybox();
  
  // bind image rollover fader
  $('#fader').hover(function() {
    $(this).find('img:eq(1)').stop(true, true).fadeIn('slow');
  }, function() {
    $(this).find('img:eq(1)').fadeOut('slow');
  });
  
  // animate green box
  var greenLeft = parseInt($('#green').css('left'));
  var greenTimer = setInterval(function() {
    $('#green').css('left', ++greenLeft);
    if (greenLeft > 300) {
      clearInterval(greenTimer);
    }
  }, 200);
  
  // animate red box
  var redLeft = parseInt($('#red').css('left'));
  function moveRed() {
    var redTimer = setTimeout(moveRed, 200);
    $('#red').css('left', ++redLeft);
    if (redLeft > 300) {
      clearTimeout(redTimer);
    }
  }
  moveRed();
  
  // display photo slideshow
  // $('#slideshow img').hide();
  // slideShow();
  
  // display true cross-fading slideshow
  rotatePics(1);
  
  // rotate news list using Innerfade plug-in
  $('#news ul').innerfade({
    animationtype: 'slide',
    speed: 750,
    timeout: 2000,
    type: 'random'
  });
  
  // horizontal photo scrolling gallery
  $('#scroller').click(function() {
    var numberOfPhotos = $(this).find('#scroller_inner > img').length;
    var last = $(this).data('last');
    var next = Math.floor(Math.random() * numberOfPhotos);
    
    if (next == last) {
      next = (next + 1) % numberOfPhotos;
    }
    
    $(this).data('last', next)
      .scrollTo(
        '#scroller_inner > img:eq(' + next + ')',
        {duration: 1000}
      );
  });
  
});

function styleSheetToggle() {
  if ($('body').width() > 1000) {
    $('<link rel="stylesheet" href="stylesheets/widescreen.css" type="text/css" />').appendTo('head');
    $('#seam div').text('Weera');
  } else {
    $('link[href=stylesheets/widescreen.css]').remove();
    $('#seam div').text('W');
  }
}

function flashMessage(message) {
  $('#flash').stop(true).hide()
             .html(message)
             .slideDown('slow')
             .delay(5000)
             .slideUp('slow');
}

function positionLightboxImage() {
  // this function can calculate width & height of the container
  // because load() event will happen after <img> already appended
  // to the container (the load function just acknowledge what to do,
  // but not yet start)
  var top = ($(window).height() - $('#lightbox_container').height()) / 2;
  var left = ($(window).width() - $('#lightbox_container').width()) / 2;
  $('#lightbox_container')
    .css({
      'top': top + $(document).scrollTop(),
      'left': left
    })
    .delay(1000)  // add professional delay!
    .fadeIn();
}

function removeLightbox() {
  $('#lightbox_overlay, #lightbox_container')
    .fadeOut('slow', function() {
      $(this).remove();
      $('body').css('overflow-y', 'auto');
    });
}

function slideShow() {
  var current = $('#slideshow .show');
  var next = current.next().length ? current.next() : current.parent().find('img:eq(0)');
  
  current.hide().removeClass('show');
  next.fadeIn('slow').addClass('show');
  
  setTimeout(slideShow, 3000);
}

function rotatePics(currentPhoto) {
  var numberOfPhotos = $('#slideshow img').length;
  currentPhoto = currentPhoto % numberOfPhotos;
  
  $('#slideshow img').eq(currentPhoto).fadeOut(function() {
    // reorder the z-index
    $('#slideshow img').each(function(i) {
      $(this).css(
        'zIndex', ((numberOfPhotos - i) + currentPhoto) % numberOfPhotos
      );
    });
    
    $(this).show();
    setTimeout(function() {rotatePics(++currentPhoto);}, 4000);
  });
}
