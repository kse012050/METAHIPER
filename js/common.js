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

    $('.bottomFix input[type="submit"]').click(function(e){
        if($(window).width() <= 1100){
            e.preventDefault();
            $('html').animate({scrollTop : $(`.topArea > div .leftArea h2`).offset().top})
        }
    })
    console.log('1234'.at(-1));
    $('.popupArea input[type="text"]').on('input keydoun',function(e){
        console.log(e);
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        let value = this.value;
        const result = Number(value) * 1000000;
        // $(this).val(value.toLocaleString() );
        $('[data-proceeds="year"]').html((result * 0.15).toLocaleString())
        $('[data-proceeds="month"]').html((result * 0.15 / 12).toLocaleString())
        $('[data-proceeds="total"]').html((result * 0.15 * 35).toLocaleString())
    })
    /* $('.popupArea input[type="text"]').keyup(function(e){
        let value = $(this).val().split(',');    
        
        if ( e.keyCode === 8 ) {
            value = Math.floor(value * 0.1)
        }else{
            if(value.length > 2){
                let lastValue = value.pop();
                value.pop();
                if(lastValue.length > 3){
                    lastValue = lastValue.substring(3)
                    console.log(lastValue);
                    value = value.join('') + lastValue[0]
                }else{
                    value = value.join('');
                }
            }
        }

        if(!value || isNaN(value)){
            console.log('??');
            $(this).val('');
            return
        }

        const result = Number(value) * 1000000;
        $(this).val(result.toLocaleString());
        $('[data-proceeds="year"]').html((result * 0.15).toLocaleString())
        $('[data-proceeds="month"]').html((result * 0.15 / 12).toLocaleString())
        $('[data-proceeds="total"]').html((result * 0.15 * 35).toLocaleString())

    }) */
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
    $('[data-popupOpen]').click(function(e){
        e.preventDefault();
        const attrName = $(this).attr('data-popupOpen');
        $(`[data-popup="${attrName}"]`).fadeIn().css('display','flex');
        $('body').css('overflow','hidden');
    })

    $('.popupArea').click(function(){
        $(this).fadeOut();
        $('body').removeAttr('style');
    })
    $('.popupArea > div').click(function(e){
        e.stopPropagation();
    })
}