$(document).ready(function(){
    
    var lis = $('#visual li');
    console.log(lis);
    var i = 0; // 0 <= i < lis.lenght-1;
    
    $('a.rightBtn').on('click', function(e){
        e.preventDefault();

        i += 1;
        if(i > lis.length - 1) i = 0;

        lis.removeClass('on');
        $(lis[i]).addClass('on');
        // $('#box'+(i + 1)).addClass('on');


        // a버튼 누르면 다음 박스 이미지로 전환
        // $('#visual li').boxes[].addClass('on');

    });
})