
let cateNo = get_url_info("cateNo");
console.log(cateNo)
load_items($('.sec .sec_item_box'), 12, cateNo);

// document.getElementsByClassName('sec_title')[0].innerHTML = title_array[cateNo]
$('.sec_title').html(title_array[cateNo])


$(document).ready(function(){
    // 무한스크롤
    let f_o_top = $('.footer').offset().top;
    $(window).scroll(function(){
        let s_bot = $(window).scrollTop() + $(window).height()

        if(s_bot >= f_o_top) {
            load_items($('.sec .sec_item_box'), 8, cateNo);
            f_o_top = $('.footer').offset().top;
        }

    })
});