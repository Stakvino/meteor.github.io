var jQuery = require('./../vendor/jquery-1.11.2.min.js');

(function($) {
   var namespace = 'jqiaGallery';
  
   var galleryDOM = `
        <div id="light_box_overlay">
          <div class="gallery-container">
            <img src="images/loading.gif" class="loading-image">
            <img src="" height="" class="display-image"/>
            <div class="lt-box"><button>&#8249;</button></div>
            <div class="gt-box"><button>&#8250;</button></div>
            <div class="controls">
              <span class="image-number">Image <span class="number-of-image">2</span> of <span class="number-of-images">8</span> </span>
              <span class="close-gallery">&times;</span>
            </div>
          </div>
        </div>
        `;
   var $window = $(window)
   var $html = $("html");
   var $lightBoxOverlay = $(galleryDOM).css("height", $html.height()).prependTo($html);
   var $galleryContainer = $("div.gallery-container", $lightBoxOverlay);
   var $loadingImg =  $("img.loading-image", $galleryContainer);
   var $gtBox = $("div.gt-box", $galleryContainer);
   var $ltBox = $("div.lt-box", $galleryContainer);
   var $closeGallery = $("span.close-gallery");
   var $numberOfImages = $("span.number-of-images", $galleryContainer);
   var $numberOfImage = $("span.number-of-image", $galleryContainer);
   var rImageNumber = /_(\d+)\./;
   var landScape = window.innerWidth > window.innerHeight;
   var $imagesLinks = null;

   var changeImage = function(newSrc){
     var height = $window.height() * 80 / 100;
     var $img = $(`<img src="${newSrc}" height="${height}" class="display-image"/>`);
     $("img.display-image", $galleryContainer).replaceWith($img);
     $galleryContainer.stop(true);
     $img.off("load");
     $img.add($gtBox).add($ltBox).hide();
     $loadingImg.show();
     $img.load(function(){
       var width = $img.width();
       var maxWidth = $window.width() * 90 / 100;
       if(width > maxWidth){
         width = maxWidth;
         $img.width(width);
         $img.css({height: "auto"});
         height = $img.css("height");
       }
       $galleryContainer.animate({height: height});
       var imageNumber = Number(newSrc.match(rImageNumber)[1]);
       $galleryContainer.animate({width: width}, 200, function(){
         $loadingImg.hide();
         $img.fadeIn(300);
         if(imageNumber < $imagesLinks.length){
           $gtBox.show();
         }
         if(imageNumber > 1){
           $ltBox.show();
         }
       });
     });
   }
   
   $window.resize(function(){
     changeImage($("img.display-image", $galleryContainer).attr("src"));
   });
  
   var methods = {
      init: function(options) {
        options = $.extend(true, {}, $.fn.jqiaGallery.defaults, options);
        
        $imagesLinks = this;
        $numberOfImages.text($imagesLinks.length);
        
        $imagesLinks.each(function(){
          var $this = $(this);
          $this.click(function(e){
            e.preventDefault();
            methods.displayGallery($this.attr("href"));
          });
        });
        
        $gtBox.click(function(){
          var $img = $("img.display-image", $galleryContainer);
          var NewSrc = $img.attr("src").replace(rImageNumber, function(_, imgNumber){
            var newNumber = Number(imgNumber) + 1;
            $numberOfImage.text(newNumber);
            return `_${newNumber < 10 ? "0" : ""}${newNumber}.`;
          });
          changeImage(NewSrc);
        });
        $ltBox.click(function(){
          var $img = $("img.display-image", $galleryContainer);
          var NewSrc = $img.attr("src").replace(rImageNumber, function(_, imgNumber){
            var newNumber = Number(imgNumber) - 1;
            $numberOfImage.text(newNumber);
            return `_${newNumber < 10 ? "0" : ""}${newNumber}.`;
          });
          changeImage(NewSrc);
        });
        
        $lightBoxOverlay.click(function(e){
          if(e.target == $closeGallery.get(0) || e.target == $lightBoxOverlay.get(0)){
            methods.closeGallery();
          }
        });
        $window.keydown(function(e){
          if(e.key == "Escape"){
            methods.closeGallery();
          }
        });
        
        return this;
      },
      displayGallery: function(clickedSrc){
        $numberOfImage.text( Number(clickedSrc.match(rImageNumber)[1]) );
        $galleryContainer.css("top", window.scrollY + $window.height() * 10 / 100);
        changeImage(clickedSrc);
        $lightBoxOverlay.fadeIn();
      },
      closeGallery: function(){
        $lightBoxOverlay.fadeOut(400, function(){
          $galleryContainer.css({width: 0, height: 0});
        });
      }
   };

   $.fn.jqiaGallery = function(method) {
      if (methods[method]) {
         return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if ($.type(method) === 'array') {
         return methods.init.apply(this, arguments);
      } else {
         $.error('Method ' + method + ' does not exist on jQuery.jqiaGallery');
      }
   };

   $.fn.jqiaGallery.defaults = {
   };
})(jQuery);