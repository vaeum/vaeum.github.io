let smallscreen = false;
let pos_to_scroll = null;

//подстраиваем кнопку "наверх" под размер окна
function modern_upbutton_resize(){
  var ourwidth_screen = $(window).width(); // взяли ширину окна
  if(ourwidth_screen >= 1007) { // здесь и ниже число пикселей будет вашим, так как зависит от ширины сайта
    $('.modern-upbutton').css('width', (ourwidth_screen-1000)/2); // окно большое, подогнали под размер
    smallscreen = false;
  } else if (ourwidth_screen >= 955) {
    $('.modern-upbutton').addClass('its-a-mobile-modern-upbutton'); // маленькое окно или планшет
    smallscreen = false;
  } else {
    smallscreen = true; // окно настолько мало, что места для кнопки просто нет, прячем её
    $('.modern-upbutton').hide();
  }
}

//при изменении юзером размеров окна подстраиваем кнопку под новый масштаб
$(window).resize(function(){
  modern_upbutton_resize();
});

//обработка клика по кнопке наверх - прокрутка вверх
function modern_upbutton_click_scrollup() {
  $('.modern-upbutton').attr('data-pos',$(window).scrollTop()); // запоминаем место, от которого проматываем наверх
  $("body,html").animate({scrollTop: 0}, 500); // прокрутка к началу
  setTimeout(function(){
    // меняем значение флажка "направление стрелки", теперь по следующему клику прокрутка пойдёт вниз
    $('.modern-upbutton').attr('data-scroll', 'down');
  }, 501);
  return false;
}

//обработка клика по кнопке наверх - прокрутка вниз
function modern_upbutton_click_scrolldown() {
  pos_to_scroll = $('.modern-upbutton').attr('data-pos'); // читаем позицию, до которой проматываем
  $('.modern-upbutton').attr('data-pos',0); // обнуляем её
  $("body,html").animate({scrollTop: pos_to_scroll}, 500); // скроллим вниз
  setTimeout(function(){
    $('.modern-upbutton').attr('data-scroll', 'up'); // меняем направление стрелочки на "вверх"
  }, 501);
  return false;
}

//управление показом и скрытием стрелки
$(window).scroll(function() {
  if(smallscreen == false && window.modern_upbutton_was_killed != true) {
    if($(window).scrollTop() >= 300) {  // если прокрутили уже 300 пикселей...
      $('.modern-upbutton').attr('data-scroll', 'up');
      $('.modern-upbutton').fadeIn(300); // показываем кнопку
    } else if ($('.modern-upbutton').attr('data-pos') == "0") {  // если верх страницы...
      if ($('.modern-upbutton').attr('data-scroll') == 'up') {
        $('.modern-upbutton').fadeOut(300); // скрываем её
      }
    }
  }
});

//функция удаления кнопки пользователем
function modern_upbutton_disable(){
  // берём сутки от текущего времени и даты
  var date = new Date(new Date().getTime() + 60*1000*60*24);

  // устанавливаем куку на сутки. По истечении этого времени кнопка появится снова.
  document.cookie="modern_upbutton_disable_by_user=1; path=/; expires="+date.toUTCString();
  $('.modern-upbutton').addClass('modern-upbutton-was-disabled'); // ставим класс "выключено"
}

//функция проверки куки по её имени
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//проверяем, не удалял ли юзер кнопку
function modern_upbutton_check_for_disable(){
  var cookcheck = getCookie('modern_upbutton_disable_by_user');  // ищем куку
  if (cookcheck != undefined) { // если нашли...
    $('.modern-upbutton').addClass('modern-upbutton-was-disabled'); // убиваем её
    window.modern_upbutton_was_killed = true;
  }
}

$(function() {

  //проверяем, не удалена ли кнопка
  modern_upbutton_check_for_disable();

  //подгоняем её под окно
  modern_upbutton_resize();

  //вешаем следилку на событие "клик по кнопке"
  $('.modern-upbutton').bind("click touch ontouchstart", function(e){
    if ($(event.target).closest(".modern-upbutton-disable").length) return;
      if ($(this).attr('data-scroll') == 'up') {
      modern_upbutton_click_scrollup();  // крутим вверх
    } else {
      modern_upbutton_click_scrolldown(); // крутим вниз
    }
    event.stopPropagation();
  });

  //вешаем следилку на событие "клик по кнопке Удалить"
  $('.modern-upbutton-disable').click(function(){
    modern_upbutton_disable(); // убиваем кнопку
  });
});
