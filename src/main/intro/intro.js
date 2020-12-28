$(document).ready(function(){
    console.log('main intro');

    $(".myScroll").myScroll({
        btns: "#navi>li",
        speed: 1000,
        base: 0,
        active: "on",
    });

     // CONTENT1 CLICK BUTTON
     var buttons = $("#content1").find("a");
   
     $(buttons)
         .toArray()
         .forEach(function(btn) {
             $(btn).on("click", function (e) {
                 e.preventDefault();
                
                 var ripples = document.createElement("span");
                 ripples.style.left = e.offsetX + "px";
                 ripples.style.top = e.offsetY + "px";
                 this.appendChild(ripples);
                 setTimeout(function () {
                     ripples.remove(); 
                 }, 50000);
             });
         });

           // TABMENU BUTTON
    $("#tab ul li").on("click", function (e) {
        e.preventDefault();

        var num = $(this).index();
        $("#tab ul li").removeClass('on');
        $(this).addClass('on');
        $('.right .tab').removeClass('on');
        $('.right .tab').eq(num).addClass('on');
       
    });

    // content2 : view more
    $('#content2 .border_txt a').on('click', function(e){
        e.preventDefault();

        $.ajax({
            url : 'data/intro/content2.json',
            beforeSend : function(){
                //로딩바 이미지 호출
    
            },
            success:function(data){
                // console.log(data)

                $(data.article).each(function(index){
                    var imgUrl = data.article[index].img;
                    var tit = data.article[index].title;
                    var sub = data.article[index].subtitle;
                    var linkUrl = data.article[index].link;

                    $('#content2 .wrap').append(

                        $('<article>')

                            .append(
                                $('<a>').attr('href','#').css('background-image', 'url(' + imgUrl + ')')
                                .append(
                                    $('<div class="box_contents">')
                                    .append(
                                        $('<div class="box_text">')
                                        .append(
                                            $('<strong>').text(tit)
                                        )
                                        .append(
                                            $('<span>').text(sub)
                                        )
                                    )
                                   
                                )
                            )
                        )
                });
            },
            error : function(){
                console.log('Fail to data load!!!');
            }

            
        });

    });

    // 스크롤시 컨텐츠 마다 .on
    $(window).on('scroll', function(){
        var scroll = $(this).scrollTop();
        var pos0 = $('.myScroll').eq(0).offset().top; //content1
        var pos1 = $('.myScroll').eq(1).offset().top; //tab
        var pos2 = $('.myScroll').eq(2).offset().top; //content2
        var pos3 = $('.myScroll').eq(3).offset().top; //content3
        var pos4 = $('.myScroll').eq(4).offset().top; //content4
        // console.log("scroll:"+scroll);
        // console.log("pos0:"+pos0);
        // console.log("pos1:"+pos1);
        // console.log("pos2:"+pos2);
        // console.log("pos3:"+pos3);
        // console.log("pos4:"+pos4);


        // if(scroll < 300){
        //     $('header').removeClass('on');
        //     $('#navi').hide();
        // }else if(scroll >= (pos0 - 400) && scroll < pos1 ){
        //     $('header').addClass('on');
        //     $('#navi').show();
        //     $('#content1').addClass('on');
        // }else if(scroll >= (pos1 - 200) && scroll < pos2 ){
        //     $('#tab').addClass('on');
        // }else if(scroll >= (pos2 - 200) && scroll < pos3){
        //     $('#content2').addClass('on');
        // }else if(scroll >= (pos3 - 200) && scroll < pos4){
        //     $('#content3').addClass('on');
        // }else if(scroll >= (pos4 - 200) ){
        //     $('#content4').addClass('on');
        // }

    });
    
        // $('header').removeClass('on');
        // $('#content1').removeClass('on');
        // $('#content2').removeClass('on');
        // $('#content4').removeClass('on');
        // $('#content3').removeClass('on');

        

});