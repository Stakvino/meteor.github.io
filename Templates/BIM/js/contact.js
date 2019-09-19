$(document).ready(function(){
  /*var $ = require('./vendor/jquery-1.12.0.min.js');
  require('./plugins/jquery.jqia.slickNav.js');
  require('./plugins/jquery.jqia.slideShow.js');
  require('./plugins/jquery.jqia.center-slider.js');*/
  const $window = $(window);

  //Auto scroll plugin
  const $navBar = $("nav");
  $navBar.jqiaSlickNav();
  const $navBarLinks = $("ul li a", $navBar);

});
