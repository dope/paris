(function(window, document, $, undefined) {

  'use strict';

  var $navTrigger   = $('.js-nav-trigger');
  var menu          = '.js-nav';
  var toggleTrigger = 'nav__cross';

  $navTrigger.on('click', function() {
    $(this).toggleClass(toggleTrigger);
    $(menu).slideToggle();
  });

})(window, document, jQuery);
