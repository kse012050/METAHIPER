$(document).ready(function(){

    // 메뉴 스크롤 이벤트
    scrollEvent()

    // 팝업 이벤트
    popupEvent()

    // 슬라이더
    sliderEvent();

    // 수익금
    proceedsInput()

    // 이름 , 전화번호 메일 보내기
    inputEvent()
   
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
        $('.popupArea').fadeOut();
        $('body').removeAttr('style');
    })
    $('.popupArea > div').click(function(e){
        e.stopPropagation();
    })
    $('.popupArea > div > span').click(function(){
        $(this).closest('.popupArea').fadeOut();
        $('body').removeAttr('style');
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
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        },
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
        this.value = this.value.replaceAll(',', '').replace('만원','')
        console.log(this.value);
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        let value = this.value;
        if(value === ''){return}
        proceedsValue(value)
    })

    $('[data-revenue]').click(function(e){
        e.preventDefault();
        const value = Number($(this).attr('data-revenue'));
        proceedsValue(value)
    })

    function proceedsValue(value , selector){
        const result = Number(value);
        let valueLength = value.length;
        // 억 단위 커서
        // valueLength > 3 && (valueLength = valueLength+1);
        // valueLength > 5 && (valueLength = valueLength+1);
        // valueLength >= 10 && (valueLength = valueLength + ( Math.floor((valueLength - 7) / 3)))
        // 억 단위 없을 때 커서
        valueLength >= 4 && (valueLength = valueLength + ( Math.floor((valueLength - 1) / 3)))
        $('#proceeds').attr('data-save',result)
        $('#proceeds').val(test(result));
        $('#proceeds').selectRange(valueLength);
        $('[data-proceeds="year"]').html(test(Math.floor((result * 0.15))))
        $('[data-proceeds="month"]').html(test(Math.floor((result * 0.15 / 12))))
        $('[data-proceeds="total"]').html(test(Math.floor((result * 0.15 * 35))))
    }

    function test(value){
        value = String(value);
        let valueLength = value.length
        let result = '';
        // 억 단위 넣기
        // if(valueLength > 4){
        //     result += value.slice(0 , valueLength - 4).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '억';
        //     result += value.slice(valueLength - 4 ,valueLength).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '만원'
        // }else{
        // }
        result += value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '만원'
        return result;
    }

    $('.simpleConsulting').click(function(e){
        e.preventDefault();
        $(this).closest('.popupArea').fadeOut();
        $('body').removeAttr('style')
        $('html').animate({scrollTop : $(`[data-scroll="consulting"]`).offset().top - ($(window).height() / 2) + ($(`[data-scroll="consulting"]`).innerHeight() / 2)})
    })
}

// 이름 , 전화번호 메일 보내기
function inputEvent(){
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

    
    $('input[type="submit"].sendBtn').click(function(e){
        e.preventDefault();
        if($(window).width() <= 1100 && $(this).hasClass('mobilePopup')){
            e.preventDefault();
            $('.applicationArea').fadeIn().css('display','flex');
            return;
        }
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
                    $('.applicationComplete').fadeIn().css('display','flex')
                }
            })
            $('[data-input]').val('')
        }
    })
}