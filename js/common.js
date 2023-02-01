$(document).ready(function(){

    // 메뉴 스크롤 이벤트
    scrollEvent()

    // 팝업 이벤트
    popupEvent()

    // 슬라이더
    sliderEvent();

    $('.bottomFix input[type="submit"]').click(function(e){
        if($(window).width() <= 1100){
            e.preventDefault();
            // $('html').animate({scrollTop : $(`.topArea > div .leftArea h2`).offset().top})
            $('.applicationArea').fadeIn().css('display','flex')
        }
    })

    // 수익금
    proceedsInput()
   

    $('[data-input="name"]').on('input',function(){
        // 한글만 입력
        this.value = this.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, '').replace(/(\..*)\./g, '$1').trim();
        // 최대 6자리
        const maxLength = Number($(this).attr('maxLength'));
        this.value.length >= maxLength && (this.value = this.value.substr(0,maxLength));
        // 글자만 판별
        (/[^가-힣]/g.test(this.value) || !this.value) ? $(this).addClass('error') : $(this).removeClass('error');
    })

    $('[data-input="mobile"]').on('input',function(){
        // 숫자만 입력
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        // 최대 11자리
        const maxLength = Number($(this).attr('maxLength'));
        this.value.length < maxLength ? $(this).addClass('error') : $(this).removeClass('error');
    })

    $('input[type="submit"]').click(function(e){
        e.preventDefault();
        let isInput;
        $(this).closest('form').find('[data-input]').each((i , input)=>{
            if($(input).val().trim() === ''){
                $(input).addClass('error');
            }
            (!isInput && $(input).hasClass('error')) && (isInput = true);
        })
        $(this).closest('form').find('[data-input].error').first().focus();

        if(!isInput){
            let form = $(this).closest('form')[0];
            let formData = new FormData(form);
            console.log(form);
            console.log(formData);
            $.ajax({
                contentType: false,       // The content type used when sending data to the server.
                cache: false,             // To unable request pages to be cached
                processData: false,        // To send DOMDocument or non processed data file it is set to false
                type: "POST",
                url: '../send_email.php',
                data: formData,
                error: function (request, textStatus, errorThrown) {
                    // alert(textStatus);
                    alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + errorThrown);
                },
                success : function(){
                    console.log('성공');
                }
            })
        }
    })
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

// 슬라이더 
function sliderEvent(){
    var topSwiper = new Swiper(".topSwiper", {
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

    var titleSwiper = new Swiper(".titleSwiper", {
        allowTouchMove : false,
        autoplay: {
            delay: 3000,
        },
        spaceBetween: 30,
    });
}

// 수익금 입력
function proceedsInput(){
     // 수익금 커서 위치
     $.fn.selectRange = function(start, end) {
        if(end === undefined) {
            end = start;
        }
        return this.each(function() {
            if('selectionStart' in this) {
                this.selectionStart = start;
                this.selectionEnd = end;
            } else if(this.setSelectionRange) {
                this.setSelectionRange(start, end);
            } else if(this.createTextRange) {
                var range = this.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            }
        });
    };
    
    // 수익금 인풋
    $('#proceeds').on('input keydoun',function(e){
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        let value = this.value;
        let valueLength = this.value.length;
        if(value === ''){return}
        $(this).val(value + '만원');
        const result = Number(value) * 1000000;
        $('#proceeds').selectRange(valueLength );
        $('[data-proceeds="year"]').html((result * 0.15).toLocaleString())
        $('[data-proceeds="month"]').html((result * 0.15 / 12).toLocaleString())
        $('[data-proceeds="total"]').html((result * 0.15 * 35).toLocaleString())
    })
}