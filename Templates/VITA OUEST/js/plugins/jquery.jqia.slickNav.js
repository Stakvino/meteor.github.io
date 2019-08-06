/*var jQuery = require('./../vendor/jquery-1.12.0.min.js');
require('./jquery.jqia.scrollTo.js');*/

(function($) {
   
  var slickNavHTML = `
    <button class="slick-nav-but slick-button-in">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <button class="slick-nav-close slick-button-out">
      <span><i class="fas fa-times"></i></span>
    </button>
    <div id="slick_nav_jquery_jqia" class="translate-out">
      <div class="slick-nav-container">
        <div class="links-container"></div>
      </div>
    </div>
  `;

 var $slickNavDOM = $(slickNavHTML);
 var $slickNavBut = $slickNavDOM.eq(0);
 const $slickNavClose = $slickNavDOM.eq(2);
 
 $.fn.jqiaSlickNav = function(options) {
   options = $.extend(true, {}, $.fn.jqiaSlickNav.defaults, options);

   //position the slicknav Button
   
   var $slickContainer = $(".slick-nav-container button.slick-nav-but", $slickNavDOM);
   if(options.position == "right"){
     $slickContainer.css("right", "15px");
   }else if(options.position == "center"){
     $slickContainer.css("align-items", "center");
   }else if(options.position == "left"){
     $slickContainer.css("left", "15px");
   }

   var $navBar = this;
   //position slick nav
   /*$(window).resize(function(){
     $slickNavDOM.css({top: $navBar.is(":hidden") ? 60 : $navBar.innerHeight()});
   }).trigger("resize");*/
   var $linksCollection = $("a", $navBar);
   

   var $linksContainer  = $("div.links-container", $slickNavDOM);
   const $slick_nav_jquery_jqia = $slickNavDOM.eq(4);

   function replaceClass($element, removedClass, adeedCLass){
     $element.removeClass(removedClass);
     $element.addClass(adeedCLass);
   }

   $slickNavBut.click(function(){
      $slick_nav_jquery_jqia.removeClass("translate-out");
      replaceClass($slickNavBut, "slick-button-in", "slick-button-out");
      replaceClass($slickNavClose, "slick-button-out", "slick-button-in");
   });

   $slickNavClose.click(function(){
      $slick_nav_jquery_jqia.addClass("translate-out");
      replaceClass($slickNavBut, "slick-button-out", "slick-button-in");
      replaceClass($slickNavClose, "slick-button-in", "slick-button-out");
   });

   //show and hide scrollUp button
   const $scrollTopButton = options.scrollTopButton;
   if($scrollTopButton){
     $(window).scroll(function(){
       //scrolling down will show scrollUp button
       var scrollTop = $(this).scrollTop();
       if( scrollTop > 270 && $scrollTopButton.is(":hidden") ){
         $scrollTopButton.fadeIn(200);
       }else if( scrollTop <= 270 && $scrollTopButton.is(":visible") ){
         $scrollTopButton.fadeOut(200);
         
       }
     }).trigger("scroll");
   }
   $scrollTopButton.click(function(e){
     e.preventDefault();
     $scrollTopButton.jqiaScrollTo(0, options.scrollAnimationDuration);
   });


   function generateLinks($ul, $container){
    const $lis = $ul.find("> li");
    $lis.each(function(){
      const $li = $(this);
      const $link = $li.find("> a");
      const href = $link.attr("href");
      const text = $link.text();
      if(!text){
        return;
      }
      const $newLi = $(`<li><a href="${href}">${text}</a></li>`);
      $newLi.appendTo($container);
      const $nestedUl = $li.find("ul").eq(0);
      if($nestedUl.length){
        const $newUl = $("<ul></ul>");
        $newUl.appendTo($newLi);
        $newLi.addClass("nested-li");
        $newUl.hide();
        const $chevronIcon = $('<span class="chevron"><i class="fas fa-chevron-down"></i></span>');
        $newLi.find("> a").append($chevronIcon);
        $newLi.find("> a").click(e => {
          if(e.target === $chevronIcon[0] || e.target === $chevronIcon.find("i")[0]){
            e.preventDefault();
            $newUl.slideToggle();
            $chevronIcon.find("i").toggleClass("rotate");
          }
        });
        generateLinks($nestedUl, $newUl);
      }
    });
   }
   generateLinks($navBar.find("ul").eq(0), $linksContainer); 
  
   var changeLinkHighlight = function($navBarLink, $slickNavLink){
     $(".selected-link", $navBar).removeClass("selected-link");
     $(".selected-link", $linksContainer).removeClass("selected-link");
     $navBarLink.addClass("selected-link");
     $slickNavLink.addClass("selected-link");
   }
   var $slickNavLinks = $linksContainer.children();
   //clicking on links will give them the selected-link that highlight background 
   $linksCollection.filter(`[href]`).click(function(){
     var $barNavLink = $(this);
     var $slickNavLink = $slickNavLinks.eq($linksCollection.index($barNavLink)).addClass("selected-link");
     changeLinkHighlight($barNavLink, $slickNavLink);
   });
   $slickNavLinks.filter(`[href]`).click(function(){
     var $slickNavLink = $(this);
     var $barNavLink = $linksCollection.eq($slickNavLinks.index($slickNavLink)).addClass("selected-link");
     changeLinkHighlight($barNavLink, $slickNavLink);
   });
   const selected = $linksCollection.filter(".selected-page");
   const selectedIndex = $linksCollection.index(selected) - 1;
   $slickNavLinks.eq(selectedIndex).addClass("selected-page");
   

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