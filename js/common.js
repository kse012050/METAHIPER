$(document).ready(function(){

    $(window).scroll(function(){
        const windowScroll = $(this).scrollTop()
        $('[data-scroll]').each(function(i){
            if(windowScroll > $(this).offset().top - 10){
                $('nav ul li').removeClass('active');
                $('nav ul li').eq($('[data-scroll]').index(this)).addClass('active')
            }
        })
        if(windowScroll < $('[data-scroll]').eq(0).offset().top){
            $('nav ul li').removeClass('active');
        }
    })

    $('a[data-click]').click(function(e){
        e.preventDefault();
        const attrName = $(this).attr('data-click');
        $('html').animate({scrollTop : $(`[data-scroll="${attrName}"]`).offset().top})
    })

    var swiper = new Swiper(".topSwiper", {
        effect : 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 3000,
        },
        spaceBetween: 30,
        allowTouchMove : false
    });
    
    var swiper = new Swiper(".titleSwiper", {
        allowTouchMove : false,
        autoplay: {
            delay: 3000,
        },
        spaceBetween: 30,
    });
})