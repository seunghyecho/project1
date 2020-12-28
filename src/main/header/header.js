$(document).ready(function(){
    console.log('header');

    $('.inner> .logo').addClass('show');
    $('.gnb li').addClass('show');

    
     // MENU BUTTON
     $(".menuBtn").on("click", function () {
        if ($(this).find("i").hasClass("fa-bars")) {
            //모바일메뉴 열기
            $(".menuBtn>i").attr("class", "fas fa-times");
            $("#gnb_mo").addClass("on");
            $('body, html').css({'overflow':'hidden'});

        } else {
            //모바일메뉴 닫기
            $(".menuBtn>i").attr("class", "fas fa-bars");
            $("#gnb_mo").removeClass("on");
            $('body, html').css({'overflow':'auto'});

        }
    });

})