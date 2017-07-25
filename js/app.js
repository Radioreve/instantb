
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
                }, 1200 );
                return false;
            }
        }
    });
});


$( document ).ready(function(){
	$(window).on('scroll', _.throttle(stickNav, 150));
});

function stickNav(){
	if( $(window).scrollTop() > 245 ){
		$('.navie').addClass('x--sticky');
	} else {
		$('.navie').removeClass('x--sticky');
	}
}



/* Pinto container */
$( document ).ready(function(){

	Macy.init({
		container: '#mason',
		trueOrder: false,
		columns: 5,
		waitForImages: false,
		margin: 20
	});

	// setTimeout(function(){
	// 	$('#mason div').velocity('slideUpIn', {
	// 		duration: 1300,
	// 		stagger: 500
	// 	}, 1000 );
	// });

	setTimeout(function(){
		$('#mason > div').velocity('slideUpIn', {
			duration: 1000,
			stagger: 400
		}, 1000 );
	});

});


