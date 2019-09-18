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


  //heeader slider
  const $headerSlider = $("div.header-slider");
  const $sliderOverlay = $("div.slider-overlay");
  $headerSlider.jqiaSlideShow({translateContent: true, delay: 6});

  //Resize heeader slider's height using image height
  const $sliderImg = $("img", $headerSlider).eq(0);
  let breakPoint = false;
  const $video_intro = $("div.video-introduction iframe");
  $window.resize(function(){
    const $imgHeight = $sliderImg.height();
    $headerSlider.height($imgHeight);
    $sliderOverlay.height($imgHeight);
    //$video_intro.width($(window).width());
    //$video_intro.height($(window).height());
  }).trigger("resize");

  const $logo = $("li.header-logo img", $navBar);
  $window.scroll(function(){
    if($window.scrollTop() >= 106 && !$navBar.hasClass("dark-nav")){
      $navBar.addClass("dark-nav");
      $logo.width(60);
    }else if($window.scrollTop() < 106 && $navBar.hasClass("dark-nav")){
      $navBar.removeClass("dark-nav");
      $logo.width(80);
    }
  }).trigger("scroll");


  //Timer
  var countDownDate = new Date("Jan 16, 2020 15:37:25").getTime();
  var timer_text = document.getElementById("timer-text");
  var days_number = document.querySelector("div.days-number");
  var hours_number = document.querySelector("div.hours-number");
  var minutes_number = document.querySelector("div.minutes-number");
  var seconds_number = document.querySelector("div.seconds-number");
  var x = setInterval(function() {

    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    days_number.textContent = days;
    hours_number.textContent = hours;
    minutes_number.textContent = minutes;
    seconds_number.textContent = seconds;

    if (distance < 0) {
      clearInterval(x);
      timer_text.innerHTML = "NOW !";
    }
  }, 1000);

  $('#lightgallery').lightGallery();
});
