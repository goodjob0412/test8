
load_items($('#best .sec_item_box'), 8, 0)
load_items($('#new .sec_item_box'), 8, 1)


$(document).ready(function () {
  let bn_count = $('.banner').length

  for (let i = 0; i < bn_count; i++) {
    $('.indi_box').append(`<div class="indi ${i == 0 ? 'active' : ''}"></div>`)
  }
 
  // 메인배너
  let idx = 0;
  let timer = 1000
  $('#btnL').click(function () { 
    slide('100%', (idx - 1) % bn_count, '-100%');
  })
  $('#btnR').click(function () {
    slide('-100%', (idx + 1) % bn_count, '100%');
  })
  $('.indi').click(function(){
    if($(this).index() > idx) {
      slide('-100%', $(this).index(), '100%');
    }
    else if($(this).index() < idx) {
      slide('100%', $(this).index(), '-100%');
    }
 
    // active 줬다뺐다 
    indi_chg($(this).index()) 
  })

  // 자동 슬라이드 켰다 껐다
  $('.main_banner').hover(function(){
    clearInterval(interval)
  }, function(){
    auto_slide();
  })


  // 오토 슬라이드 
  let interval;
  function auto_slide() {
    interval = setInterval(() => {
      $('#btnR').trigger('click')
    }, timer + 3000);
  }
  auto_slide()

  function indi_chg(ttt) {
    $('.indi').removeClass('active')
    $('.indi').eq(ttt).addClass('active')
  }


  let btn_life = true
  function slide(o_pos, c_bang, c_pos) {
    if(btn_life) {
      btn_life=false;
      setTimeout(() => {
        btn_life=true
      }, timer);


      $('.banner').eq(idx % bn_count).animate({
        left: o_pos
      }, timer)
      // 들어올판
      $('.banner').eq(c_bang).animate({
        left: c_pos
      },0).animate({
        left: 0
      }, timer)
      
      idx=c_bang

      indi_chg(idx)
    }
  }

  let wr_o_top = $('#weekly_ranking').offset().top
  let best_o_top = $('#best').offset().top
  let new_o_top = $('#new').offset().top

  let wr_chk = true;
  let best_chk = true;
  let new_chk = true;

  $(window).scroll(function(){
    let s_bot = $(window).scrollTop() + $(window).height()

    if(wr_chk && (s_bot - 200 >= wr_o_top)) {
      wr_chk = false; 
      // for(let i=0; i<$('#weekly_ranking .item_init').length; i++) {
      //   setTimeout(function()  {
      //     $('#weekly_ranking .item_init').eq(i).addClass('active')
      //   }, 100 * i);
      // }
      item_slide_up($('#weekly_ranking .item_init'))
    }
    if(best_chk && (s_bot - 200 >= best_o_top)) {
      best_chk = false; 
      // for(let i=0; i<$('#best .item_init').length; i++) {
      //   setTimeout(function()  {
      //     $('#best .item_init').eq(i).addClass('active')
      //   }, 100 * i);
      // }
      item_slide_up($('#best .item_init'))
    }
    if(new_chk && (s_bot - 200 >= new_o_top)) {
      new_chk = false; 
      // for(let i=0; i<$('#new .item_init').length; i++) {
      //   setTimeout(function()  {
      //     $('#new .item_init').eq(i).addClass('active')
      //   }, 100 * i);
      // }
      item_slide_up($('#new .item_init'))
    }
  })

  function item_slide_up(el) {
    for(let i=0; i<el.length; i++) {
      setTimeout(function()  {
        el.eq(i).addClass('active')
      }, 100 * i);
    }
  }


  // 레이어팝업
  $('.popup_big_img > img').eq(0).fadeIn(0);
  // popup_btn 에 마우스 올리면 해당 번쨰에 맞는  popup_img fadeIn 되게 하기
  $('.popup_btn').mouseenter(function(){
    $('.popup_img').fadeOut(300)
    $('.popup_img').eq($(this).index()).fadeIn(300)
  })
  
  $('.layer_popup').mouseenter(function(){
    clearInterval(pop_interval)
  })
  $('.layer_popup').mouseleave(function(){
    auto_pop_slide()
  })

  let pop_idx = 1
  let pop_interval;
  function auto_pop_slide() {
    pop_interval = setInterval(function(){
      $('.popup_img').eq((pop_idx-1) % 6).fadeOut(300)
      $('.popup_img').eq(pop_idx % 6).fadeIn(300)
      pop_idx+=1
    }, 2000)
  }
  auto_pop_slide()


  $('.btn_close').click(function(){
    clearInterval(pop_interval)
    $('.layer_popup').remove()
  })
  // 레이어 팝업 끌고 다니기
  $('.layer_popup').mousedown(function(e){
    clearInterval(pop_interval)
    
    let clicked_pos_x = e.clientX - $('.layer_popup').position().left
    let clicked_pos_y = e.clientY - $('.layer_popup').position().top

    $(document).on('mousemove', function(e){
      let m_pos_x = e.clientX
      let m_pos_y = e.clientY 

      $('.layer_popup').css({
        left: m_pos_x - clicked_pos_x,
        top: m_pos_y - clicked_pos_y
      })
    });
  })

  $('.layer_popup').mouseup(function(){
    $(document).off('mousemove')
  })
});