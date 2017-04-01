//= include variables.js

$(function() {
  //= include share.js
  //= include up-button.js
  //= include search.js
  //= include off-canvas.js
  //= include is-on-screen.js


  var elements = document.querySelectorAll("img");
  Array.prototype.forEach.call(elements, function(el, i){
    el.setAttribute("onerror", "this.src='/images/notfound.jpg'")
  });

  function goToByScroll(id){
    $('html,body').animate({
      scrollTop: $(id).offset().top - 80,
    }, 'slow');
  }

  if ($('#markdown-toc').length) {
    $("#markdown-toc a").on("click", function(e){
      e.preventDefault();
      goToByScroll($(this).attr("href"));
    })
  }
});


