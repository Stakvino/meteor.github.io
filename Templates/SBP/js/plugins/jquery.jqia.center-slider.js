//var jQuery = require('./../vendor/jquery-1.12.0.min.js');

(function($){
  const defaults = {
    autoPlay : true,
    delay : 1000,
    autoPlayDelay : 4000
  };
  
  let   $sliderContainer = null;
  const $arrowLeft = $("span.arrow.left", $sliderContainer);
  const $arrowRight = $("span.arrow.right", $sliderContainer);
  const $slider = $("div.slider-center", $sliderContainer);
  const $slides = $("div.slide-center", $slider);

  let timerId = null;
  let isAnimated = false;
  let autoPlayIsRunning = true;

  function next(options){
    const selected = $("div.slider-center").find(".selected");
    const isLastElement = !selected.next().next().length;
    if(isLastElement){
      $("div.slider-center").append($("div.slide-center").first());
      $("div.slide-center").last().css("left", "100%");
    }
    
    selected.removeClass("selected");
    selected.next().addClass("selected");
    
    isAnimated = true;

    $slides.animate({
      left:"-=33.33%"
    },options.delay,function(){
      isAnimated = false;
      if(options.autoPlay && !autoPlayIsRunning){
        timerId = setInterval(function(){ next(options); }, options.autoPlayDelay);
        autoPlayIsRunning = true;
      }
    });
  }
  
  function previous(options){
    const selected = $("div.slider-center").find(".selected");
    const isFirstElement = !selected.prev().prev().length;
    if(isFirstElement){
      $("div.slider-center").prepend($("div.slide-center").last());
      $("div.slide-center").first().css("left", "-33.33%");
    }
    
    selected.removeClass("selected");
    selected.prev().addClass("selected");
    
    isAnimated = true;
    $slides.animate({
      left:"+=33.33%"
    },options.delay,function(){ 
      isAnimated = false;
      if(options.autoPlay && !autoPlayIsRunning){
        timerId = setInterval(function(){ next(options); }, options.autoPlayDelay);
        autoPlayIsRunning = true;
      }
    });
  }
  
  const methods = {
    init: function(options) {
      options = $.extend(defaults, options);

      $slides.eq(1).addClass("selected")
      $slides.each(function(index){
        const position = index * 33.33;
        $(this).css("left", position + "%");
      });
      $slides.css("transition", "transform " + options.delay/1000 + "s");
      
      function moveRight(){
        clearInterval(timerId);
        autoPlayIsRunning = false;
        if(!isAnimated){
          next(options);
        }
      }
      $arrowRight.click(moveRight);
      
      function moveLeft(){
        clearInterval(timerId);
        autoPlayIsRunning = false;
        if(!isAnimated){
          previous(options);
        }
      }
      $arrowLeft.click(moveLeft);
      
      $slides.click(function(){
        if($(this).next().hasClass("selected")){
          moveLeft();
        }else if($(this).prev().hasClass("selected")){
          moveRight();
        }
      });
      if(options.autoPlay){
        timerId = setInterval(function(){ next(options); }, options.autoPlayDelay);
      }
    }
  };
  
  $.fn.jqiaSliderCenter = function(method){
    $sliderContainer = $(this);

    const $arrowLeft = $("span.arrow.left", $sliderContainer);
    if(methods[method]){
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1) 
      );
    }else if($.type(method) === 'object'){
      return methods.init.apply(this, arguments);
    }else{
      $.error('Method ' + method + ' does not exist on jQuery.jqiaSlider');
    }
    return this;
  }

})(jQuery);


