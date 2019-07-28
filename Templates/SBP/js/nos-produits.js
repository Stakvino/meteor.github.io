const $navBar = $("nav");
$navBar.jqiaSlickNav();

const $productTypesContainer = $("div.products-types ul");
const $productTypes = $("li", $productTypesContainer);
const $productsContainers = $("div.products-container > div");
const $dropDown = $("div.products-types div.drop-down");

$dropDown.children().first().text($productTypesContainer.find(".selected").text());
$productTypes.click(function(e){
  const $oldType = $productTypesContainer.find(".selected");
  const $newType = $(this);
  const oldIndex = $productTypes.index($oldType);
  const newIndex = $productTypes.index($newType);
  
  $oldType.removeClass("selected");
  $newType.addClass("selected");

  $dropDown.children().first().text($newType.text());
  
  $productsContainers.eq(oldIndex).fadeOut(400, function(){
    $productsContainers.eq(newIndex).fadeIn(400);
  });
});

$productsContainers.slice(1).hide();

//drop down
$dropDown.click(function(e){
  if($productTypesContainer.is(':hidden') && $dropDown.is(':visible')){
    $productTypesContainer.slideDown();
    e.stopPropagation();
  }
});

addEventListener("click", e => {
  if($productTypesContainer.is(':visible') && $dropDown.is(':visible')){
    $productTypesContainer.slideUp();
  }
});
addEventListener("resize", e => {
  if($dropDown.is(':hidden') && $productTypesContainer.is(":hidden")){
    $productTypesContainer.show();
  }
});
