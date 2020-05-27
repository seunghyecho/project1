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

                    $('#content2 .wrap')
                        .append(
                            $('<article>').css('background-image', 'url(' + imgUrl + ')')
                            .append(
                                $('<div>')
                                .append(
                                    $('<h2>').text(tit)
                                )
                                .append(
                                    $('<a>').attr('href','#').text(sub)
                                )
                                .append(
                                    $('<a>').attr('href','#').text(sub)
                                )
                                .append(
                                    $('<a>').attr('href','#').append(
                                        $('<i>').addClass("fas fa-bookmark")
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

        $('header').removeClass('on');
        

        var scroll = $(this).scrollTop();
        
        var pos0 = $('.myScroll').eq(0).offset().top; //header
        // console.log(scroll,$('.myScroll').eq(1).offset().top)
        var pos1 = $('.myScroll').eq(1).offset().top; //content1
        var pos2 = $('.myScroll').eq(2).offset().top; //tab
        var pos3 = $('.myScroll').eq(3).offset().top; //content2
        var pos4 = $('.myScroll').eq(4).offset().top; //content4
        var pos5 = $('.myScroll').eq(5).offset().top; //content3
        
        if(scroll > 10){
            $('header').addClass('on');
        }
        if(scroll >= (pos1 - 600) && scroll < pos2 ){
            $('#content1').addClass('on');
        }

        if(scroll >= (pos2 - 600) && scroll < pos3 ){
            $('#tab').addClass('on');
        }

        if(scroll >= (pos3 - 600) && scroll < pos4){
            $('#content2').addClass('on');
        }

        if(scroll >= (pos4 - 600) && scroll < pos5){
            $('#content4').addClass('on');
        }

        if(scroll >= (pos5 - 600) ){
            $('#content3').addClass('on');
        }

    });
    
        $('header').removeClass('on');
        $('#content1').removeClass('on');
        $('#content2').removeClass('on');
        $('#content4').removeClass('on');
        $('#content3').removeClass('on');

        

});