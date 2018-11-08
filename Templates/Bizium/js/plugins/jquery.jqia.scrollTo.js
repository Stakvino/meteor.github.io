//var jQuery = require('./../vendor/jquery-1.11.2.min.js');

(function($) {

   $.fn.jqiaScrollTo = function(to, options) {
     options = $.extend(true, {}, $.fn.jqiaScrollTo.defaults, options);
     
     const $page = $("html");
     $page.stop();
     var scrollTo = 0;
     if(typeof to == "number"){
       scrollTo = to;
     }else{
       const toPosition = to.eq(0).offset().top;
       const navBar = this.eq(0);
       scrollTo = options.includeHeight ? toPosition - navBar.innerHeight() - navBar.position().top : toPosition;
     }
     if(options.removeScrollHandlers){
       $( window ).off("scroll");
     }
     $page.animate({scrollTop : scrollTo}, options.scrollAnimationDuration, "swing", function(){
       if(options.finishCallback){
         options.finishCallback();
       }
     });
   };
  
  $.fn.jqiaScrollTo.defaults = {
    scrollAnimationDuration: 1000,
    includeHeight: true,
    finishCallback : false
   };
  
  return this;
})(jQuery);