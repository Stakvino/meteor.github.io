var $ = require('./vendor/jquery-1.11.2.min.js');
require('./plugins/jquery.jqia.slickNav.js');

$("nav").jqiaslickNav( $(`[data-anchor]`), {scrollTopButton : $("#scrollUp")});