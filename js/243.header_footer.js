$(document).ready(function() {
    $('.tb_item').eq(0).css({top: 0});

    let tb_idx = 0;
    let tb_length = $('.tb_item').length;
    setInterval(() => {
        // 위로 내보낼거
        $('.tb_item').eq(tb_idx % tb_length).animate({
            top: '-100%'
        }, 500)

        // 아래서 들어올거
        $('.tb_item').eq((tb_idx+1) % tb_length).css({
            top: '100%'
        }).animate({
            top: 0
        }, 500)

        tb_idx+=1;
    }, 500 + 1000);



    $('.nav_item, .nav_pan').hover(function(){
        // 판 펼치기
        $('.nav_pan').addClass('active')

        if($(this).hasClass('nav_item')) {
            $('.nav_pan_item').css({display: 'none'}).eq($(this).index()).css({display: 'flex'})
        }
    },function(){
        // 판 접기
        $('.nav_pan').removeClass('active') 
    })
 


    let tb_height = $('.top_banner').height();
    let nav_o_top = $('.nav').offset().top;
    let nav_height = $('.nav').height();
    // 스크롤 높이에 따라 nav 위치 변경
    $(window).scroll(function(){
        let s_top = $(window).scrollTop() + tb_height

        if(s_top >= nav_o_top) {
            $('.nav').css({
                position: 'fixed',
                left: 0,
                top: tb_height,
                zIndex: 9999999999  
            })
            $('.main').css({
                paddingTop: nav_height
            })
        }
        else {
            $('.nav').css({
                position: 'relative',
                left: 0,
                top: 0, 
            })
            $('.main').css({
                paddingTop: 0
            })
        }
    })
})
