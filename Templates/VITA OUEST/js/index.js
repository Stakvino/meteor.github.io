/*var $ = require('./vendor/jquery-1.12.0.min.js');
require('./plugins/jquery.jqia.slickNav.js');
require('./plugins/jquery.jqia.slideShow.js');*/
const $window = $(window);

//Auto scroll plugin
const $navBar = $("nav");
$navBar.jqiaSlickNav();
const $logo = $("#logo");
const $navBarLinks = $("ul li a", $navBar);

//NavBar style change on scroll
/*
$window.scroll(function(){
  var $this = $(this);
  var $linksContainer = $("div.links-container", $("#slick_nav_jquery_jqia"));
  if($this.scrollTop() > 100){
    if(!$navBar.hasClass("black-nav-bar")){
      $navBar.removeClass("white-nav-bar").addClass("black-nav-bar");
      //$navBarLinks.css("color", "white");
    }
    if(!$linksContainer.hasClass("black-links-container")){
      //$linksContainer.removeClass("white-links-container").addClass("black-links-container");
    }
  }else{
    if(!$navBar.hasClass("white-nav-bar")){
      $navBar.removeClass("black-nav-bar").addClass("white-nav-bar");
      //$navBarLinks.css("color", "black");
    }
    if(!$linksContainer.hasClass("white-links-container")){
      $linksContainer.removeClass("black-links-container").addClass("white-links-container");
    }
  }
}).trigger("scroll");
*/
//heeader slider
const $headerSlider = $("div.header-slider");
$headerSlider.jqiaSlideShow({translateContent: true});
//Resize heeader slider's height using image height
const $sliderImg = $("img", $headerSlider).eq(0);
$window.resize(function(){
  const $imgHeight = $sliderImg.height();
  $headerSlider.height($imgHeight);
}).trigger("resize");

/*
function getImageDimensions(path,callback){
  var img = new Image();
  img.onload = function(){
      callback({
          width : img.width,
          height : img.height
      });
  }
  img.src = path;
  
}*/

const ratioAspect = 0.5625;
const slider = document.querySelector("div.header-slider");
function resizeSliderHeight(){
  const height = document.body.offsetWidth * ratioAspect;
  slider.style.height = height + "px";
}
resizeSliderHeight();
addEventListener("resize",resizeSliderHeight);

const $dropDownP = $("li.drop-down-p a");
const $dropDownList = $("ul.drop-down-list").hide();

const $dropDownBolts = $("li.drop-down-p > a img");

$("li.drop-down-p").hover(function(){
  $dropDownList.slideDown();
  $dropDownBolts.addClass("rotate-bolt");
},function(){
  $dropDownList.slideUp();
  $dropDownBolts.removeClass("rotate-bolt");
});

