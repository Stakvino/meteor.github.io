const $smallScreenCategories = $("div.small-screen-categories div.title");
const $smallScreenList = $("div.small-screen-categories ul").hide();

$smallScreenCategories.click(e => $smallScreenList.slideToggle());
