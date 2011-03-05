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
  $('#sidenav li').hover(function() {
    $(this).animate({paddingRight: '+=15px'}, 200);
  }, function() {
    $(this).animate({paddingRight: '-=15px'}, 200);
  });
  
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
  flashMessage('Welcome to jQuery world!');
  
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
