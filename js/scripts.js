$(document).ready(function () {
  $('#mycarousel').carousel({
    interval: 1000 * 2
  });
  $('#carousel-button').click(function () {
    if ($('#carousel-button').children('span').hasClass('fa-pause')) {
      $('#mycarousel').carousel('pause');
      $('#carousel-button').children('span').removeClass('fa-pause');
      $('#carousel-button').children('span').addClass('fa-play');
    }
    else if ($('#carousel-button').children('span').hasClass('fa-play')) {
      $('#mycarousel').carousel('cycle');
      $('#carousel-button').children('span').removeClass('fa-play');
      $('#carousel-button').children('span').addClass('fa-pause');
    }
  });
  // toggle Reserve Table modal
  $('#reserveButton').click(function () {
    "use strict";
    $('#reserveTable').modal('toggle');
  });
  // toggle Login modal
  $('#loginLink').click(function () {
    "use strict";
    $('#loginModal').modal('toggle');
  });
});