/*
 Smooth scrolling
 When clicking on a anchor (<a href="...">)
 */
$(function () {
  $('.scroll-to a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      var ofs = $('.navigation').height();
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - ofs
        }, 1200);
        return false;
      }
    }
  });
});


$(document).ready(function () {
  $(window).on('scroll', _.throttle(stickNav, 150));
});

function stickNav() {
  if ($(window).scrollTop() > 245) {
    $('.navie').addClass('x--sticky');
  } else {
    $('.navie').removeClass('x--sticky');
  }
}

function showInstantText(link) {
  $('.instants-txt').removeClass('x--active');
  $('.instants-txt[data-link="'+ link +'"]').addClass('x--active');
}

$(document).ready(function () {
  Emmy.on("marislider:show", function (data) {
    console.log("Showing slider : " + data.link);
    showInstantText(data.link);
  });
});

$(document).ready(function () {
  var numberOfColumns;
  if ($(window).width() < 400) {
    return;
  }
  else if ($(window).width() < 700) {
    numberOfColumns = 2;
  }
  else if ($(window).width() < 1000) {
    numberOfColumns = 3;
  }
  else {
    numberOfColumns = 4;
  }
  Macy.init({
    container: '#mason',
    trueOrder: false,
    columns: numberOfColumns,
    waitForImages: false,
    margin: 20
  });

  // setTimeout(function(){
  // 	$('#mason div').velocity('slideUpIn', {
  // 		duration: 1300,
  // 		stagger: 500
  // 	}, 1000 );
  // });

  setTimeout(function () {
    $('#mason > div').velocity('slideUpIn', {
      duration: 1000,
      stagger: 400
    }, 1000);
  });
});


console.log("%c Crafted with love by radioreve. ","background: #75306b; color: #FFF;font-weight: 500;padding: 5px;")

