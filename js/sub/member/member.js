$(function(){

    var $form = $('#join');
    var $required = $('.required');
    var $terms = $('input[name=terms]');
    var $pwd = $('input[type=password]').eq(0);
    console.log($pwd);
    var $pwd2 = $('input[type=password]').eq(1);
    console.log($pwd2);
    var $reset =  $('input, td, textarea');
    var isAgreed = true;
    
    // 이벤트, 핸들러함수 바인딩
    $form.on('submit', function(e){
        e.preventDefault();
    
        //수정할때마다 .red 지우기
        $reset.removeClass('red');
    
        var agreed = $terms.is(':checked');
        var pwd = $pwd.val();
        var pwd2 = $pwd2.val();
        var len = $required.length;
    
        // 약관동의체크
        check_terms(agreed);
        // 필수텍스트요소 반복을 돌면서 체크
        check_text(len);
        // 비밀번호 매칭 체크
        check_pwd(pwd,pwd2);
        // 위의 4가지 체크결과값이 모두 true이면 회원가입 승인처리
    
        /*함수 안쪽에서  var없이 변수를 선언하면 자동으로 전역변수에 등록됨 */
        if( isAgreed && isPwd && isRequired) confirm();
    });
    
    function confirm(){
        alert('회원가입이 완료되었습니다.');
        // 빈칸으로 만들기
        $required.val('');
        
    }
    
    
    function check_pwd(pwd,pwd2){
        if(pwd !== pwd2){
            alert('비밀번호를 동일하게 입력해주세요');
            $pwd.addClass('red');
            $pwd2.addClass('red');
            isPwd = false;
        }else{
            isPwd = true;
        }
    }
    
    function check_terms(agreed){
        if(!agreed){
            alert('약관을 동의해주세요');
            $terms.siblings('textarea').addClass('red');
            isAgreed = false;
        }else{
            isAgreed = true;
        }
    }
    
    function check_text(len){
        var i=0;
        $required.each(function(){
            var data = $(this).val();
            var txt = $(this).attr('placeholder');
            console.log(data);
            console.log(txt);
            if(!data){
                alert(txt);
                $(this).addClass('red');
            }else{
                i++;
                // 값이 들어있으면 실행, 증가되면서 밑으로 실행
            }
        })
        
        if(i !== len){
            isRequired = false;
        }else{
            isRequired = true;
        }
        // i가 4가 되느냐,안되는냐에 따라서 (i 값이 len 값이랑 동일해야)
    }
});
