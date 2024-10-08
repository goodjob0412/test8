let cateNo = get_url_info("cateNo");
let itemNo = get_url_info("itemNo")-1;

console.log(cateNo, itemNo)
const ITEM = ITEM_LIST[cateNo][itemNo];
//{item_no: 2, src: '2.jpg', title: '하얀 원통', o_price: 20000, s_price: 70000, desc: '상품에 대한 설명이 표시됩니다.'}, 
const S_PRICE = ITEM.s_price;

let list = `
<div class="item_big_img">
    <img src="./img/theComma/items/${menu_array[cateNo]}/${ITEM.src}" alt=""> 
    <div class="magnifier" style="background: url(./img/theComma/items/${menu_array[cateNo]}/${ITEM.src})"></div>
</div>
<div class="item_info_box"> 
    <div class="item_title">${ITEM.title}</div>
    <div class="item_info_price">
        <table class="item_info_tb">
            <tr>
                <td class="ii_title">소비자가</td>
                <td class="ii_desc">${ITEM.o_price.toLocaleString('ko')}원</td>
            </tr>
            <tr>
                <td class="ii_title">판매가</td>
                <td class="ii_desc">${ITEM.s_price.toLocaleString('ko')}원</td>
            </tr> 
            <tr>
                <td class="ii_title">배송비</td>
                <td class="ii_desc">
                    <select>
                        <option value="">주문시 결제(선결제)</option>
                        <option value="">수령시 결제(착불)</option>
                    </select>
                    <span>2,500원 (3,000,000원 이상 구매 시 무료)</span>
                </td>
            </tr>
            <tr>
                <td class="ii_title">적립금</td>
                <td class="ii_desc">	10,000원(20%)</td>
            </tr>
        </table>
    </div>
    <div class="item_sec_color">
        <div class="sec_color_title">색상</div>
        <div class="color_opt_box">
            <div class="color_box" data-color="BLACK">
                <div class="cb_black"></div>
            </div>
            <div class="color_box" data-color="WHITE">
                <div class="cb_white"></div>
            </div>
            <div class="color_box" data-color="GRAY">
                <div class="cb_gray"></div>
            </div>

            <div class="color_txt">[필수] 옵션을 선택해 주세요</div>
        </div>
    </div>
    <div class="item_sec_list">
        <div class="selected_opt_header">(최소주문수량 1개 이상)</div>
        
        <ul class="selected_opt_list">
             
        </ul>
    </div>
    <div class="item_sec_finalPrice">
        <span>TOTAL: </span>
        <span class="final_price">0원</span> 
        <span class="final_qty">(0개)</span>
    </div>
    <div class="item_sec_btn">
        <div class="btn_buy">BUY IT NOW</div>
        <div class="btn_addCart">ADD TO CART</div>
        <div class="btn_wishList">WISH LIST</div>
    </div>
</div>
`;

$('.info_box').append(list);


$(document).ready(function(){
    // 돋보기
    // $('.item_big_img').mousemove(function(e){
    $(document).on('mousemove', '.item_big_img', function(e){
        let img_size_w = $('.item_big_img > img').width()
        let img_size_h = $('.item_big_img > img').height()
        console.log(img_size_w,img_size_h)
        // 마우스 위치 - e.pageX, e.pageY
        // 1. pageX, pageY로 문서 좌상단 0 0 지점 기준으로 마우스 포지션 잡고, 이미지 박스의 위치값도 잡아서 빼주면 
        //    이미지 박스 기준 마우스 위치 잡을수 있음
        // pageX,pageY: 문서 좌상단 기준
        // clientX, clientY: 화면 좌상단 기준
        // offsetX, offsetY: 해당요소 좌상단 기준
        // let mouseX = e.pageX - $(e.target).offset().left
        // let mouseY = e.pageY - $(e.target).offset().top
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;

        // console.log(e.pageX, e.pageY)
        // console.log(e.clientX, e.clientY)
        // console.log(e.offsetX, e.offsetY)

        // 2. 마우스가 위미지 영역 안에 있으면 돋보기 나타나게 하기
        // 3. 마우스가 원의 중심에 오게 하기
        let px = mouseX - ($('.magnifier').width() / 2)
        let py = mouseY - ($('.magnifier').height() / 2)
        
        // 4. 배경 이미지가 원의 가운데에 오게 하기
        let tmpX = -mouseX + ($('.magnifier').width() / 2)
        let tmpY = -mouseY + ($('.magnifier').height() / 2)


        // 5. 돋보기 위치 마우스 따라다니면서 이동시키기
        $('.magnifier').css({
            // left: mouseX,
            // top: mouseY,
            left: px,
            top: py,

            backgroundPosition: tmpX+"px "+ tmpY +"px",
            backgroundSize: `${img_size_w}px ${img_size_h}px`
        })

    })
    

    // let btn_chk = [true,true,true];
    let btn_chk = {
        black: true,
        white: true,
        gray: true
    } 
    $('.color_box').click(function(){ 
        let ttt =$(this).data('color').toLowerCase();

        if(btn_chk[ttt]) {
            btn_chk[ttt]=false
    
            let dataColor = $(this).data('color')
            // console.log($(this).attr('data-color'))
            
            $('.selected_opt_list').append(`
                <li class="opt_list">
                    <div class="opt_name">
                        <div>마켓디자인</div>
                        <div>-<span class="color">${dataColor}</span></div>
                    </div>
                    <div class="opt_qty">
                        <input type="button" value="-" class="btn_qty btn_minus">

                        <input type="text" class="txt_qty" value="1">
                        
                        <input type="button" value="+" class="btn_qty btn_plus">

                        <img src="./img/theComma/product/btn_price_delete.gif" alt="" class="btn_remove">
                    </div>
                    <div class="opt_price">
                        <div>${ITEM.s_price.toLocaleString('ko')}원</div>
                        <div>(적립 10,000원)</div>
                    </div>
                </li>` 
            )  

            
            total_price()
        }
        else {
            alert("이미 선택한 옵션 입니다.")
        }
    })

    $(document).on('click', '.btn_plus', function(){
        let new_qty = +$(this).prev('.txt_qty').val() + 1
        console.log(new_qty)
        $(this).prev('.txt_qty').val(new_qty)

        total_price()
    })
    $(document).on('click', '.btn_minus', function(){
        if($(this).next('.txt_qty').val() > 1) {
            let new_qty = +$(this).next('.txt_qty').val() - 1
            $(this).next('.txt_qty').val(new_qty)
            total_price()
        }
        else {
            alert("최소 주문 수량은 1개 입니다.")
        }
    })
    $(document).on('click', '.btn_remove', function(){
        $(this).parent().parent().remove();

        let ttt =$(this).parents('.opt_list').find('.color').text().toLowerCase();
        btn_chk[ttt]=true;

        total_price()
    })

    function total_price() {
        let total_price=0;
        let txt_qty_length = $('.txt_qty').length;

        for(let i = 0; i<txt_qty_length; i++) {
            total_price += +$('.txt_qty').eq(i).val() * ITEM.s_price
        }
        $('.final_price').text(total_price.toLocaleString('ko')+"원");
    }
})