$(function(){
    console.log('main intro');

    // floating_menu : click
    var $menu = $('.floating_menu li');
    var $doc = $('html, body');
    var $section = $('.scroll');

    $menu.on('click', 'a' ,function(e){
        var $li = $(this).parent();
        var idx = $li.index();
        var sectionIndex = $section.eq(idx);
        var offsetTop = sectionIndex.offset().top;

        $doc.stop().animate({
            scrollTop:offsetTop
        },800);
        return false;

    });

    // floating_menu : scroll
    $(window).scroll(function(){

        var scltop = $(this).scrollTop();

        $.each($section, function(idx){

            var $target = $section.eq(idx);
            var targetTop = $target.offset().top;

            if(targetTop <= scltop){
                $menu.removeClass('on');
                $menu.eq(idx).addClass('on');
            }
            if(!(300 <= scltop)){
                $menu.removeClass('on');
            }
        });
    });

     // CONTENT1 :  click
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

    // TAB : click
    $("#tab ul li").on("click", function (e) {
        e.preventDefault();

        var num = $(this).index();
        $("#tab ul li").removeClass('on');
        $(this).addClass('on');
        $('.right .tab').removeClass('on');
        $('.right .tab').eq(num).addClass('on');
       
    });

    // content2 : click - >더보기
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

    //content4 : mousemove
    window.addEventListener('mousemove', function(e){
        var content4 = $('#content4 .videoText');
        var mousePos = { x: 0, y: 0 };
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;

        content4.css({
            'transform':'rotateX('+mousePos.y*5+'deg) rotateY('+mousePos.x*5+'deg)'
        });

    });


});