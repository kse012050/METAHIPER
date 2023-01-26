$(document).ready(function(){

    // 메뉴 스크롤 이벤트
    scrollEvent()

    // 팝업 이벤트
    popupEvent()

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

// 메뉴 스크롤 이벤트
function scrollEvent(){
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

    $('a[data-scrollClick]').click(function(e){
        e.preventDefault();
        const attrName = $(this).attr('data-scrollClick');
        $('html').animate({scrollTop : $(`[data-scroll="${attrName}"]`).offset().top})
    })
}

// 팝업 이벤트
function popupEvent(){
    $('[data-popupOpen]').click(function(){
        const attrName = $(this).attr('data-popupOpen');
        $(`[data-popup="${attrName}"]`).fadeIn().css('display','flex');
        $('body').css('overflow','hidden');
    })

    $('.popupArea').click(function(){
        $(this).fadeOut();
        $('body').removeAttr('style');
    })
    $('.popupArea > div').click(function(e){
        console.log(1);
        e.stopPropagation();
    })
}