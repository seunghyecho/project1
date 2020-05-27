$(document).ready(function(){
    console.log('header');

    $('.inner> .logo').addClass('show');
    $('.gnb li').addClass('show');

    
     // MENU BUTTON
     $(".menuBtn").on("click", function () {
        if ($(this).find("i").hasClass("fa-bars")) {
            $(".menuBtn>i").attr("class", "fas fa-times");
            $("#gnb_mo").addClass("on");
        } else {
            $(".menuBtn>i").attr("class", "fas fa-bars");
            $("#gnb_mo").removeClass("on");
        }
    });
})