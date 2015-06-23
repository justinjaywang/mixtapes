// +function ($) {
//   'use strict';

//   // figure captions
//   $('.project-content').each(function (i, projectContent) {
//     $(projectContent).find('img').each(function () {
//       // (1) wrap imgs in a figure
//       var img = this,
//         $img = $(this),
//         $imgWrap = $img.parent();
//       $imgWrap.find('br').remove(); // remove extra <br>
//       if ($imgWrap.is('p')) {
//         $img.unwrap(); // remove <p> wrap
//       }
//       $img.wrap('<figure class="project-figure"></figure>');
//       // (2) append figcaption
//       var alt = img.alt,
//         $figure = $img.parent();
//       if (alt) {
//         $figure.append('<figcaption class="project-figure-caption">' + alt + '</figcaption>');
//       }
//       // (3) assign proper CSS class based on image type
//       if ($img.hasClass('wide')) { // wide image type
//         $figure.addClass('wide');
//       } else if ($img.hasClass('full')) {
//         $figure.addClass('full');
//       } else if ($img.hasClass('left')) { // left-floated image type
//         $figure.addClass('left');
//         $figure.wrap('<div class="container--narrow"></div>');
//       } else if ($img.hasClass('half')) { // half image type
//         $figure.addClass('half');
//       } else if ($img.hasClass('third')) { // third image type
//         $figure.addClass('third');
//       } else { // default image type
//         $figure.addClass('default');
//       }
//     });
//   });

//   // navigation
//   // : variables
//   var body = $('body'),
//     backLink = $('#backNav');
//   var arriveDelay = 0,
//     departDelay = 0;

//   // : functions
//   var navigate = function(href) {
//     setTimeout(function() {
//       window.location.href = href;
//     }, departDelay);
//   };
//   var navigateBack = function() {
//     setTimeout(function() {
//       history.back();
//     }, departDelay);
//   };

//   // : handlers
//   backLink.click(function(e) {
//     e.preventDefault();
//     var backUrl = document.referrer,
//       rootUrl = window.location.origin + '/', // add trailing slash
//       tagUrl = rootUrl + 'tag', // tag directory name
//       shouldGoBack = (history.length > 1) && (backUrl === rootUrl || backUrl.indexOf(tagUrl) != -1);
//     if (shouldGoBack) {
//       navigateBack();
//     } else {
//       var href = $(this).attr('href');
//       if (href) navigate(href);
//     }
//     return false;
//   });

//   // stickyHeader
//   // : variables
//   var $window = $(window),
//     $document = $(document),
//     $stickyHeader = $('.stickyHeader'),
//     scrollInterval = 150,
//     windowHeight = 0,
//     bodyHeight = 0,
//     headerHeight = 0,
//     headerBufferHeight = 0,
//     headerBufferMultiplier = 1,
//     prevScrollTop = 0,
//     scrollTop = 0,
//     relativeScrollTop = 0,
//     scrollBottom = 0,
//     headerElement,
//     headerClasses = {};

//   // : construction
//   var init = function() {
//     if (isTouchDevice()) return; 
//     if (!$stickyHeader.length) return;
//     $stickyHeader.addClass('isEnabled isShown');
//     if ($window.scrollIntervalId) {
//       // clear previous scrollIntervalId
//       $window.prevScrollIntervalId = $window.scrollIntervalId;
//       clearInterval($window.prevScrollIntervalId);
//     }
//     $window.scrollIntervalId = setInterval(updatePage, scrollInterval);
//     setInitialValues();
//     bindWindowResize();
//   };

//   var setInitialValues = function() {
//     windowHeight = window.innerHeight;
//     bodyHeight = $document[0].body.scrollHeight;
//     headerHeight = $stickyHeader[0].offsetHeight;
//     headerBufferHeight = Math.ceil(headerHeight * headerBufferMultiplier);
//     prevScrollTop = window.pageYOffset;
//     scrollTop = prevScrollTop;
//     scrollBottom = scrollTop + windowHeight;
//     headerClasses.isShown = true;
//     applyClasses();
//   };

//   // : updating
//   var updatePage = function() {
//     window.requestAnimationFrame(function() {
//       updateValues();
//       updateClasses();
//     });
//   };

//   var updateValues = function() {
//     bodyHeight = $document[0].body.scrollHeight;
//     prevScrollTop = scrollTop;
//     scrollTop = window.pageYOffset;
//     scrollBottom = scrollTop + windowHeight;
//     relativeScrollTop = scrollTop - prevScrollTop; // positive value = scrolled down
//   };

//   var applyClasses = function() {
//     // apply classes to header element
//     var stickyHeader = $('.stickyHeader');
//     $.each(headerClasses, function(key, val) {
//       if (val) {
//         stickyHeader.addClass(key);
//       } else {
//         stickyHeader.removeClass(key);
//       }
//     });
//   };

//   var updateClasses = function() {
//     // update header class isShown (main function)
//     var isAtTop = (scrollTop <= 0),
//       isNearBottom = (scrollBottom >= (bodyHeight - headerBufferHeight)),
//       isBelowHeader = (scrollTop > headerHeight),
//       isBelowHeaderBuffer = (scrollTop > headerBufferHeight),
//       hasScrolledDown = (relativeScrollTop > 0),
//       hasScrolledUp = (relativeScrollTop < 0);

//       if (!isBelowHeaderBuffer && headerClasses.isShown) {
//         return;
//       } else if (!isBelowHeaderBuffer) {
//         // show
//         headerClasses.isShown = true;
//       } else if (isNearBottom && !headerClasses.isShown) {
//         // show
//         headerClasses.isShown = true;
//       } else if (isNearBottom) {
//         return;
//       } else if (hasScrolledDown && headerClasses.isShown) {
//         // hide
//         headerClasses.isShown = false;
//       } else if (hasScrolledUp && !headerClasses.isShown) {
//         // show
//         headerClasses.isShown = true;
//       } else {
//         return;
//       }
//       applyClasses();
//   };

//   // : bind window resize
//   var bindWindowResize = function() {
//     $window.bind('resize',
//       function() {
//         setInitialValues();
//       }
//     );
//   };

//   // : detect touch device
//   var isTouchDevice = function() {
//     return (('ontouchstart' in window)
//       || (navigator.MaxTouchPoints > 0)
//       || (navigator.msMaxTouchPoints > 0));
//   };

//   // : start
//   init();

// }(jQuery);
