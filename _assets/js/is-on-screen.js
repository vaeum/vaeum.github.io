$.fn.isOnScreen = function(){
  var win = $(window);

  var viewport = {
    top : win.scrollTop(),
    left : win.scrollLeft()
  };

  viewport.right = viewport.left + win.width();
  viewport.bottom = viewport.top + win.height();

  var bounds = this.offset();
  bounds.right = bounds.left + this.outerWidth();
  bounds.bottom = bounds.top + this.outerHeight();

  return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};



$(function() {

  //управление показом и скрытием стрелки
  $(window).scroll(function() {
    if ($(window).width() > 992) {
      if (!$(".sidebar").isOnScreen()){
        $(".main").css({
          'padding-right': '0px'
        });

        $(".sidebar").css({
          right: '-330px'
        })

      } else {
        $(".main").css({
          'padding-right': '330px'
        });

        $(".sidebar").css({
          right: '15px'
        })
      }
    }
  });
});
