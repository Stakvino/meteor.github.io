/*var jQuery = require('./../vendor/jquery-1.12.0.min.js');
require('./jquery.jqia.scrollTo.js');*/

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
 
 $.fn.jqiaSlickNav = function(options) {
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
   $(window).resize(function(){
     $slickNavDOM.css({top: $navBar.is(":hidden") ? 60 : $navBar.innerHeight()});
   }).trigger("resize");
   var $linksCollection = $("a", $navBar);
   //event hadlers for nav links
   $linksCollection.each(function(index){
     var $this = $(this);
     if($this.attr("href").startsWith("#")){
      var $to = $($this.attr("href").slice(1));
      $this.click(function(e){
        e.preventDefault();
        $navBar.jqiaScrollTo($to, options.scrollAnimationDuration);
      });
     }
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
     $scrollUpBut.jqiaScrollTo(0, options.scrollAnimationDuration);
   });

   $linksCollection.each(function(index){
     var $linkCollection = $(this);
     var href = $linkCollection.attr("href");
     var text = $linkCollection.text();
     if(!text){
       return;
     }
     var a = $(`<a href="${href}">${text}</a>`);
     if($linkCollection.attr("data-anchor") === ""){
       a.attr("data-anchor", "");
     }
     //add target attribute to new links created if it exist
     if( $linkCollection.attr("target") ){
       a.attr("target", $linkCollection.attr("target"));
     }
     if( $linkCollection.hasClass("selected-page") ){
      a.addClass("selected-page");
    }
     //clicking on a slickNav link will scroll to the anchor
     if(a.attr("data-anchor") === ""){
       a.click(function(e){
         e.preventDefault();
         var $bar = $navBar.is(":hidden") ? $slickNavBut : $navBar;
         var $to = $($(this).attr("href").slice(1));
         $bar.jqiaScrollTo($to, options.scrollAnimationDuration);
         $linksContainer.slideUp();
       });
     }
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