var $ = require('./vendor/jquery-1.12.0.min.js');
require('./plugins/jquery.jqia.slickNav.js');
require('./plugins/jquery.jqia.slideShow.js');
const $window = $(window);

//Faq show/hide animation
$("div.faq-sub-question a").click(function(e){
  e.preventDefault();
  const $this = $(this);
  const $arrow = $this.parent().children().last();
  if($arrow.hasClass("black-faq-arrow")){
    $arrow.removeClass("black-faq-arrow").addClass("orange-faq-arrow");
  }else{
    $arrow.removeClass("orange-faq-arrow").addClass("black-faq-arrow");
  }
  const $answer = $this.parent().next();
  $answer.slideToggle(300);
});


//Auto scroll plugin
const $navBar = $("nav");
$navBar.jqiaSlickNav();
const $logo = $("#logo");
const $navBarLinks = $("ul li a", $navBar);

//NavBar style change on scroll
$window.scroll(function(){
  var $this = $(this);
  var $linksContainer = $("div.links-container", $("#slick_nav_jquery_jqia"));
  if($this.scrollTop() > 100){
    if(!$navBar.hasClass("black-nav-bar")){
      $navBar.removeClass("white-nav-bar").addClass("black-nav-bar");
      $navBarLinks.css("color", "white");
    }
    if(!$linksContainer.hasClass("black-links-container")){
      $linksContainer.removeClass("white-links-container").addClass("black-links-container");
    }
  }else{
    if(!$navBar.hasClass("white-nav-bar")){
      $navBar.removeClass("black-nav-bar").addClass("white-nav-bar");
      $navBarLinks.css("color", "black");
    }
    if(!$linksContainer.hasClass("white-links-container")){
      $linksContainer.removeClass("black-links-container").addClass("white-links-container");
    }
  }
}).trigger("scroll");

//heeader slider
const $headerSlider = $("div.header-slider");
$headerSlider.jqiaSlideShow({translateContent: true});
//Resize heeader slider's height using image height
const $sliderImg = $("img", $headerSlider).eq(0);
$window.resize(function(){
  const $imgHeight = $sliderImg.height();
  $headerSlider.height($imgHeight);
}).trigger("resize");

//Testimonial slider
const $testimonialSlider = $("div.testimonial-slider");
$testimonialSlider.jqiaSlideShow({translateContent: true});

