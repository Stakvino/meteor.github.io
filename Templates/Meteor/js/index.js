var $ = require('./vendor/jquery-1.11.2.min.js');
require('./plugins/jquery.jqia.slickNav.js');
require('./plugins/jquery.jqia.gallery.js');
require('./plugins/jquery.jqia.slideShow.js');

var $navBar = $("nav");
var $logo = $("#logo > img", $navBar);
var $navBarLinks = $("a", $navBar);
//auto scroll plugin
$navBar.jqiaSlickNav( $(`[data-anchor]`) );
$("#logo").click(function(){
  $logo.jqiaScrollTo(0);
});
//NavBar style change on scroll
$(window).scroll(function(){
  var $this = $(this);
  if($this.scrollTop() > 100){
    if(!$navBar.hasClass("black-nav-bar")){
      $navBar.removeClass("white-nav-bar").addClass("black-nav-bar");
      $navBarLinks.css("color", "black");
      $logo.attr("src", function(index, oldValue){
        return oldValue.replace("white", "black");
      });
    }
  }else{
    if(!$navBar.hasClass("white-nav-bar")){
      $navBar.removeClass("black-nav-bar").addClass("white-nav-bar");
      $navBarLinks.css("color", "white");
      $logo.attr("src", function(index, oldValue){
        return oldValue.replace("black", "white");
      });
    }
  }
}).trigger("scroll");

//Slidershow behavior
$("div.header-slideshow", $main).jqiaSlideShow({controls: false, translateContent: true});

//Service hover
$("div.service", "div.main").hover(function(){
  $("img", $(this)).attr("src", function(index, oldValue){
    return oldValue.replace("main", "white");
  });
}).mouseleave(function(){
  $("img", $(this)).attr("src", function(index, oldValue){
    return oldValue.replace("white", "main");
  });
});

//Portfolio photos filter becomes green on click
var $main = $("div.main");
var $filtersList = $("ul.portfolio-filters", $main);
$("li", $filtersList).click(function(){
  $(".selected-portfolio-filter", $filtersList).removeClass("selected-portfolio-filter");
  $(this).addClass("selected-portfolio-filter");
});
//filter plugin
var mixitup = require('mixitup');
var mixer = mixitup('.protfolio-photos', { 
    animation: {
        effects: 'fade translateZ(-100px)'
    },
    callbacks: {
        onMixEnd: function(state) {
             var photosNumber = $("div.protfolio-photo:visible").length;
             var numberOfLines = Math.floor((photosNumber - 1)/4);
             console.log(numberOfLines)
             $("div.protfolio-photos", $main).css("grid-template-rows", 
    `${numberOfLines > 0 ? `repeat(${numberOfLines}, 260px)` : ""} 230px`)
        }
    }
  });
//gallery display plugin
$("div.our-portfolio").find("[data-qia-gallery]").jqiaGallery([]);

//Blog Description click will pop up a text box
var $blog = $("div.our-blog", $main);
var $blogDescriptions = $("div.blog-post-description", $blog);
$("div.blog-item", $blog).click(function(){
  var $this = $(this);
  var $blogDescription = $("div.blog-post-description", $this);
  if($blogDescription.is(":hidden")){
    $blogDescriptions.filter(":visible").fadeOut(300);
    $blogDescription.fadeIn(300);
  }
});
$blogDescriptions.click(function(){
  $(this).fadeOut(300);
});

//Achivements count
var $achievementsContainer = $("div.achievements-container", $main);
var timeToFinish = 5000;
var id = null;
$("div.counter", $achievementsContainer).each(function(){
  var $this = $(this);
  var numberOfAchievements = Number($this.data("number-of-achievements"));
  var delay = timeToFinish/numberOfAchievements;
  id = setInterval(function(){
    var currentNumber = Number($this.text());
    if(currentNumber >= numberOfAchievements){
      clearInterval(id);
    }else{
      var newText = null;
      if( !document.hidden ){
        newText = currentNumber + 1;
      }else{
        newText = currentNumber + Math.floor(1000/delay) > numberOfAchievements ? numberOfAchievements : currentNumber + Math.floor(1000/delay);
      }
      $this.text(newText);
    }
  }, delay);
});
var $window = $(window);
