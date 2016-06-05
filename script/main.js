$(document).ready(function(){
    $('.carousel').carousel({
      interval: false
    })

    $('.nav li a').click(function () {
      $('.nav li').removeClass('active');
      $(this).parent().addClass('active');
    })

    $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 900, 'swing');
  });
});
