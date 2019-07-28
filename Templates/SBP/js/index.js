/*var $ = require('./vendor/jquery-1.12.0.min.js');
require('./plugins/jquery.jqia.slickNav.js');
require('./plugins/jquery.jqia.slideShow.js');
require('./plugins/jquery.jqia.center-slider.js');*/
const $window = $(window);

//Auto scroll plugin
const $navBar = $("nav");
$navBar.jqiaSlickNav();
const $logo = $("#logo");
const $navBarLinks = $("ul li a", $navBar);


//heeader slider
const $headerSlider = $("div.header-slider");
$headerSlider.jqiaSlideShow({translateContent: true, delay: 6});
//Resize heeader slider's height using image height
const $sliderImg = $("img", $headerSlider).eq(0);
let breakPoint = false;
$window.resize(function(){
  const $imgHeight = $sliderImg.height();
  $headerSlider.height($imgHeight);
}).trigger("resize");


$("div.slider-container-center").jqiaSliderCenter({});