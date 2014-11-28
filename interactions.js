/*IMAGE RESIZE*/

/*img max-height e max-width*/

function img_size() {
    var window_height = $(window).height();
    var window_width = $(window).width();
	var window_proportion = window_width / window_height;

    $('.image img').css('max-width', window_width).css('max-height', window_height);
	
	if (window_proportion >= 2.5) {
		$('.image img').css('max-width', window_width*0.6).css('max-height', '');
		}
    }

/*div size*/

function resize_div() {
    var img_height = $(this).children('.main').outerHeight();
    var img_width = $(this).children('.main').outerWidth();
    $(this).css('height', img_height);
    $(this).css('width', img_width);
    }

function apply_resize_div() {$('.image').each(resize_div);} 

/*topbar width*/

function topbar_width() {
    var menu_width = $('#menu').outerWidth();
	$('#topbar').css('width', menu_width);
    }

/*function calls*/

img_size();
apply_resize_div();

function all_size_functions() {
    img_size();
    apply_resize_div();
    }

function load_all_size_functions() {$(this).load(all_size_functions); }

$('img').each(load_all_size_functions);
$(window).resize(all_size_functions);
$(window).scroll(all_size_functions);



/*MAKING OF*/

$('.main').addClass('visible').addClass('clickable');

/*adicionar before img*/

function add_before_and_ids() {
	var attribute_src = $(this).attr('src');
	var src_before = attribute_src.replace(".", "_before.");

	var clean_src_for_id = attribute_src.replace("works/", "").replace(".jpg", "");
	var menu_item_id = clean_src_for_id;
	menu_item_id += '_link';
	
	$(this).after("<img src='"+src_before+"'class='before'>");
	$(this).parent().attr("id", clean_src_for_id);
	
	$('#menu').append("<a id='"+menu_item_id+"' style='background-image:url("+attribute_src+")'></a>");
	}

$('.image > .main').each(add_before_and_ids);


/*timeout*/

var timeout_before_img
var timeout_legenda

function restore_main_image() { $('.main.invisible').removeClass('invisible').addClass('visible'); }
function restore_legenda() { $('.main.invisible').prev('.legenda').removeClass("move_up"); }

function clear_timeout() { 
	clearTimeout(timeout_before_img);
	clearTimeout(timeout_legenda);
	}

function legenda_up() {
	if ($(this).hasClass('visible')) {
		$('.main').prev('.legenda').removeClass("move_up");
		$(this).prev('.legenda').addClass("move_up");
		timeout_before_img = setTimeout(function () {restore_legenda()} , 5000);
		}
	
	else {$(this).prev('.legenda').removeClass("move_up");}
	}

function making_of() {
	
	if ($(this).hasClass('visible')) {
		$('.main').addClass('visible');
		$(this).addClass('invisible').removeClass('visible');
		timeout_legenda = setTimeout(function () {restore_main_image()} , 5000);
		}
	
	else {$(this).removeClass('invisible').addClass('visible');}

}


$('.main').click(clear_timeout).click(legenda_up).click(making_of);

/*instruções*/

$('.main').before("<div class='legenda'><div class='legenda_icon'></div><p>Clique na imagem para ver o Making Of</p><p>Clique novamente para voltar à imagem final</p></div>");

$('article').after("<div id='legenda_fixa'><div class='legenda_icon'></div><p>Clique em qualquer imagem para ver o Making Of</p></div>");

/*"antes" tag*/

function tag() {$(this).before("<div class='antes_tag'><p>Making of: Antes</p></div>");}

$('.before').each(tag);

/*copyright*/

/*$('.main').after("<div class='copyright'><p>©</p></div>");*/




/*NAVIGATION*/

/*Classes*/

$('#topbar_container, .image').addClass('navpoint');
$('.navpoint').addClass('not_viewed');

function image_position() {
    var image_position = $(this).offset().top.toFixed();
    var scroll_position = window.pageYOffset;
    if (scroll_position > image_position) {$(this).removeClass('viewed not_viewed viewing').addClass('viewed'); }
    if (scroll_position < image_position) {$(this).removeClass('viewed not_viewed viewing').addClass('not_viewed'); }
    if (scroll_position == image_position) {$(this).removeClass('viewed not_viewed viewing').addClass('viewing'); }   
    }

function analyze_images() {$('.navpoint').each(image_position); }

analyze_images ();
$(document).ready(analyze_images);
$(window).load(analyze_images);
$(window).scroll(analyze_images);
$(window).resize(analyze_images);

/*Botoes*/

function to_top() {
	var scroll_position = window.pageYOffset;
	$('html, body').animate({scrollTop : 0},scroll_position/3);
	}

function go_to_next() {
    var image_position = $('.not_viewed').first().offset().top.toFixed();
    $('html, body').animate({scrollTop: (image_position)},1100);
    }

function go_to_previous() {
    var image_position = $('.viewed').last().offset().top.toFixed();
    $('html, body').animate({scrollTop: (image_position)}, 1100);
    }

function go_to_menu() {
    var image_position = $('#menu').last().offset().top.toFixed();
	var scroll_position = window.pageYOffset;
    $('html, body').animate({scrollTop: (image_position)},scroll_position/3);
    }

$('#logo').click(to_top);
$('#top').click(to_top);
$('#down').click(go_to_next);
$('#up').click(go_to_previous);
$('#menu_button').click(go_to_menu);


/*Regras para mostrar botoes*/

$('nav a').addClass('clickable').addClass('visible');

function active_buttons() {
    var scroll_position = window.pageYOffset;
    var min_position = 2;

    if (scroll_position < min_position) {$('#top, #up').removeClass('clickable').addClass('inactive'); }
    else {$('#top, #up').removeClass('inactive').addClass('clickable');}
    
    if ($('.navpoint:last').hasClass('not_viewed')) {$('#down').removeClass('inactive');}
    else {$('#down').addClass('inactive');}
	
	var menu_position = $('#menu').last().offset().top.toFixed();
	
	if (scroll_position <= menu_position) {$('#menu_button').addClass('inactive');}
	else {$('#menu_button').removeClass('inactive');}
    }

active_buttons();
$(document).ready(active_buttons);
$(window).load(active_buttons);
$(window).scroll(active_buttons);
$(window).resize(active_buttons);


/*MENU*/


function menu_size() {   
    var window_width = $(window).width();
    var menu_padding = $('#menu').css('padding');
    var width_available = parseInt(window_width) - parseInt(menu_padding)*2;
    
    var image_width = $('#menu a').outerWidth();
    var image_margin = $('#menu a').css('margin');
    var image_total_width = (image_width) + parseInt(image_margin) * 2;
    
    var number_of_columns = Math.floor(width_available / image_total_width);
    
    var menu_width = number_of_columns * image_total_width + parseInt(menu_padding)*2;
    
    $('#menu').css('width', menu_width);
    }

menu_size();
$(document).ready(menu_size);
$(window).load(menu_size);
$(window).scroll(menu_size);
$(window).resize(menu_size);

$('#menu a').addClass('clickable');


/*scroll to image*/


function go_to_image() {
	var raw_id = $(this).attr('id');
	var clean_id = raw_id.replace("_link", "");
	
	var number_of_divs = $('.image').size();
	var divs_before = $($('#' + clean_id)).nextAll().size();
	var position = number_of_divs - divs_before;
	
    var image_position = $('#' + clean_id).first().offset().top.toFixed();
    $('html, body').animate({scrollTop: (image_position)},position*350);
	}

$('#menu a').click(go_to_image);
