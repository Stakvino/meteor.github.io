var jQuery = require('./../vendor/jquery-1.11.2.min.js');
require('./jquery.jqia.scrollTo.js');

(function($) {
   
  var slickNavHTML = `
    <div id="slick_nav_jquery_jqia">
      <div class="slick-nav-container">
        <button class="slick-nav-but">
        <span></span>
        <span></span>
        <span></span>
        </button>
        <div class="links-container"></div>
      </div>
    </div>
  `;

 var $slickNavDOM = $(slickNavHTML);
 var $slickNavBut = $("button", $slickNavDOM);
 
 $.fn.jqiaSlickNav = function($anchorsCollection, options) {
   options = $.extend(true, {}, $.fn.jqiaSlickNav.defaults, options);

   //position the slicknav Button
   var $slickContainer = $(".slick-nav-container", $slickNavDOM);
   if(options.position == "right"){
     $slickContainer.css("align-items", "flex-end");
   }else if(options.position == "center"){
     $slickContainer.css("align-items", "center");
   }else if(options.position == "left"){
     $slickContainer.css("align-items", "flex-start");
   }

   var $navBar = this;
   //position slick nav
   $slickNavDOM.css({top: $navBar.is(":hidden") ? 60 : $navBar.innerHeight()});
   var $linksCollection = $("a", $navBar);
   //event hadlers for nav links
   $linksCollection.each(function(index){
     var $this = $(this);
     if($this.attr("href") !== "#"){
       return ;
     }
     $(this).click(function(e){
       e.preventDefault();
       $(window).off("scroll", scrollChangeHighlight);
       $navBar.jqiaScrollTo($anchorsCollection.eq(index), {finishCallback : function(){
         $(window).on("scroll", scrollChangeHighlight);
       } });
     });
   });

   var $linksContainer  = $("div.links-container", $slickNavDOM).hide();
   $slickNavBut.click(function(){
     $linksContainer.slideToggle();
   }); 
   
   var $scrollUpBut = $("#scrollUp");
   //show and hide scrollUp button
   if(options.scrollTopButton){
     $(window).scroll(function(){
       //scrolling down will show scrollUp button
       var scrollTop = $(this).scrollTop();
       if( scrollTop > 270 && $scrollUpBut.is(":hidden") ){
         $scrollUpBut.fadeIn(200);
       }else if( scrollTop <= 270 && $scrollUpBut.is(":visible") ){
         $scrollUpBut.fadeOut(200);
       }
     }).trigger("scroll");
   }
   $scrollUpBut.click(function(e){
     e.preventDefault();
     $scrollUpBut.jqiaScrollTo(0);
   });

   $linksCollection.each(function(index){
     var $linkCollection = $(this);
     var href = $linkCollection.attr("href");
     var a = $(`<a href="${href}">${$linkCollection.text()}</a>`);
     //add target attribute to new links created if it exist
     if( $linkCollection.attr("target") ){
       a.attr("target", $linkCollection.attr("target"));
     }

     //clicking on a slickNav link will scroll to the anchor
     a.filter("[href=#]").click(function(e){
       e.preventDefault();
       var $bar = $navBar.is(":hidden") ? $slickNavDOM : $navBar;
       $bar.jqiaScrollTo($anchorsCollection.eq(index), options.scrollAnimationDuration);
       $linksContainer.slideUp();
     });
     a.appendTo($linksContainer);
     //this will be used to keep event handlers
     /* 
     $this.ready(function(){
       var linkEvents = $._data($this.get(0), "events");
       //attach click event handlers to the new links
       if(linkEvents && linkEvents.click){
         var clickEvents = linkEvents.click;
         for(var i = 0; i < clickEvents.length; i++){
           a.click(clickEvents[i].handler);
         }
       }
     });
     */
   });
   
   var changeLinkHighlight = function($navBarLink, $slickNavLink){
     $(".selected-link", $navBar).removeClass("selected-link");
     $(".selected-link", $linksContainer).removeClass("selected-link");
     $navBarLink.addClass("selected-link");
     $slickNavLink.addClass("selected-link");
   }
   var $slickNavLinks = $linksContainer.children();
   //clicking on links will give them the selected-link that highlight background 
   $linksCollection.filter(`[href="#"]`).click(function(){
     var $barNavLink = $(this);
     var $slickNavLink = $slickNavLinks.eq($linksCollection.index($barNavLink)).addClass("selected-link");
     changeLinkHighlight($barNavLink, $slickNavLink);
   });
   $slickNavLinks.filter(`[href="#"]`).click(function(){
     var $slickNavLink = $(this);
     var $barNavLink = $linksCollection.eq($slickNavLinks.index($slickNavLink)).addClass("selected-link");
     changeLinkHighlight($barNavLink, $slickNavLink);
   });
   
   var $navBarSpace = $navBar.innerHeight() - $navBar.position().top;
   function scrollChangeHighlight(){
     var anchorPositions = $anchorsCollection.map(function(){
       var anchorPosition = $(this).offset().top - $navBarSpace;
       return anchorPosition < 0 ? 0 : anchorPosition;
     }).toArray().concat([$("html").height()]);
     
     var scrollTop = $(this).scrollTop();
     //scrolling will highlight the right link
     for(var i = 0; i < anchorPositions.length; i++){
       if(scrollTop >= anchorPositions[i] && scrollTop <= anchorPositions[i + 1]){
         changeLinkHighlight($linksCollection.eq(i), $slickNavLinks.eq(i));
       }
     }
   }
   $(window).scroll(scrollChangeHighlight).trigger("scroll");
   $slickNavDOM.prependTo(document.body);

   return this;
 };

 $.fn.jqiaSlickNav.defaults = {
    keepEventHandlers: [],
    keepStyle: false,
    position: "right",
    scrollAnimationDuration : 1000,
    scrollTopButton : false
 };
  
})(jQuery);