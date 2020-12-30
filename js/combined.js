$(document).ready(function(){
    console.log('footer');
})
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
(function($){

    $.defaults = {
        btns : '#navi>li',
        speed : 1000,
        base : 0,
        active : 'on'
    }

    $.fn.myScroll = function(option){
        option = $.extend(null,$.defaults, option);
        new MyScroll(this, option);
        return this;
    }

    function MyScroll(selector, option){
        this.option = option;
        this.init(selector);
        this.setPos();
        this.bindingEvent();
    }    

    MyScroll.prototype.init = function(selector){
        this.$body = $('html,body');
        this.$boxs = $(selector);             
        this.$btns = $(this.option.btns);
        this.len = this.$btns.length;
        this.speed = this.option.speed;
        this.base = this.option.base;
        this.active = this.option.active;
        this.pos = [];
    }

    MyScroll.prototype.setPos = function(){
        var self = this;
        self.pos = [];
        
        $(self.$boxs).each(function(){
            self.pos.push($(this).offset().top);           
        }); 
        self.pos.push(self.$boxs.last().offset().top + self.$boxs.last().height());
        // console.log(self.pos);
    
    }  

    MyScroll.prototype.bindingEvent = function(){
        var self = this;

        $(window).on('resize',function(){
            self.setPos();
        });

        $(window).on('scroll',function(){
            var scroll = $(window).scrollTop();
            self.activation(scroll);
        });

        self.$btns.on('click',function(e){
            e.preventDefault();
            var target = $(this).children('a').attr('href');
            self.moveScroll(target);
        })
    }

    MyScroll.prototype.activation = function(scroll){
        this.$btns.removeClass(this.active);
        this.$boxs.removeClass(this.active);

        for(var i=0; i<this.len; i++){
            if(scroll>=this.pos[i]+this.base && scroll<this.pos[i+1]+this.base){
                this.$btns.eq(i).addClass(this.active);
                this.$boxs.eq(i).addClass(this.active);
            }
        }
    }

    MyScroll.prototype.moveScroll = function(target){
        var target_pos = $(target).offset().top;
        this.$body.stop().animate({scrollTop : target_pos},this.speed);
    }

})(jQuery);
$(document).ready(function(){
    
    var lis = $('#visual li');
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


    var isAnimated = true;
	// var delay = convertSpeed('.wrap');
	
	$('.imgBtn>li').on('click',function(){

		if(isAnimated){
			isAnimated = false;
            var imgNum = $(this).index();
            

			// $('.imgBtn>li').removeClass('on');
			// $('.imgBtn>li').eq(i).addClass('on');
			$('.inner>li.upper').addClass('lower').removeClass('upper');
			$('.inner>li').eq(imgNum).addClass('upper');

			setTimeout(function(){
				$('.inner>li.lower').removeClass('lower');
				isAnimated = true;
			},1000);
		}		
	});

    
})
$(document).ready(function(){
    console.log('sub community');
    $("tr.que").on("click", function (e) {
        e.preventDefault();
        // console.log(e.target);
        $(this).next().toggle();
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        
    });
})
$(document).ready(function(){

 
    var dataURL = 'https://api.instagram.com/v1/users/self/media/recent';
    var photoData;
  
    var $wrap = $('#insta'); //인스타가 출력될 프레임
    var count_num = 15;  //출력할 포스트갯수
    var token = "670958357.1677ed0.89e3ef90b315438b827285d921374a98"; //개인토큰
    var text_count =10; //자를 글자갯수
 

    getData(dataURL);    
    
    function getData(url) {
      $.ajax({
        url: url,
        dataType: 'jsonp',
        data: {
          access_token: token, 
          count:count_num
        }
      })
      .success(function(data) {
        photoData = data;	          
        var post = photoData.data;       
  
        $(post).each(function(i){  
          console.log(this);
      
          var imgUrl = this.images.standard_resolution.url;
          var imgLink = this.link;
          var tags = this.tags[0];
          var caption;
  
          if(this.caption){
            caption = this.caption.text;   
            var len = caption.length;
                  
            if(len>text_count){
              caption = caption.substr(0,text_count)+"...";  
            }            
          }
          
        // 수정부분
          $wrap.append(
                $('<article class="insta_item '+tags+'">')
                .append(
                              $('<div class="inner">')
                              .append(
                                $('<div class="pic">').css({'background-image':'url('+imgUrl+')'})
                              )             
                              .append(
                                $('<p>').text(caption)
                              )   
                        )
                            
          );
          
  
        });


        $(".insta_item").css({
          "background-position":"center",
          "background-size" : "cover",
          "background-repeat" : "no-repeat",
          "background-color" : "rgba(255,255,255,1)"
        });       
        
      })
      .error(function() {
            alert("데이터불러오기에 실패했습니다");
      })
    }

  
      
  });
  
$(function(){
    var url_interests = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList';
    var url_search = 'https://www.flickr.com/services/rest/?method=flickr.photos.search';
    var key = '8aebf0ea9ffa03545c39c4f6e23f2dce';

    // ================================
    var version = navigator.userAgent;
    console.log(version)

    if(   /edge/i.test(version)  &&  /chrome/i.test(version) ){
        $('body').addClass('edge');
    }

    if(   /trident/i.test(version)   ){
        $('body').addClass('ie_old');
    }

    if(   /chrome/i.test(version)  &&  ! /edge/i.test(version)  ){
        $('body').addClass('chrome');
    }

// ------------------------------------------------------

    getFlickr(url_interests, key);

    //검색
    $('.flickr .sub_visual span').on('click', function(){

        var tags = $('.sub_visual input[type=search]').val();
        console.log(tags)
        getFlickr(url_search, key, tags);
        $('.sub_visual input[type=search]').val(' '); //실행후 다시공백

    })
    //

    $('body').on('click', '.flickrPop',function(){
        $('.flickrPop').fadeOut(500, function(){
            $(this).remove();
        });
    })

    $('body').on('click', '.flickrPop span', function(){
        $('.flickrPop').fadeOut(500, function(){
            $(this).remove();
        })
    })

     //pop창 실행
    $('body').on('click', '.flickr li', function(e){
        
        e.preventDefault();

        var imgSrc = $(this).find('a').attr('href');
        var imgTit = $(this).find('h2').text();

        $('body')
            .append(
                $('<div class="flickrPop">')
                    .append(
                        $('<img>').attr('src', imgSrc),
                        // $('<h2>').text(imgTit),
                        $('<span>')
                                .append(
                                        $('<i class="fas fa-times"></i>')
                                )
                     )
                     .fadeOut()
            )
    })
    //

    function getFlickr(url, key, tags){
        $.ajax({
            url : url,
            dataType : 'json',
            data : {
                api_key : key,
                per_page : 20,
                tags : tags,
                tagmode : 'any',
                privacy_filter : 5,
                format : 'json',
                nojsoncallback : 1
            }
        })

        .success(function(data){

            $('.flickr .inner ul').empty();
            //검색후 이전 검색내용 비우기

            var item = data.photos.photo;
            // console.log(item)
            $(item).each(function(){

                var farm = this.farm;
                var server = this.server;
                var imgId = this.id;
                var imgSec = this.secret;      
                var tit = this.title;

                // https://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg

                // farm-id: 1
                // server-id: 2
                // photo-id: 1418878
                // secret: 1e92283336
                // size: m

                $('.flickr > .inner > ul')
                    .append(
                        $('<li>')
                            .append(
                                $('<a>').attr('href', 'https://farm'+farm+'.staticflickr.com/'+server+'/'+imgId+'_'+imgSec+'_b.jpg')
                                    .append(
                                        $('<img>').attr('src', 'https://farm'+farm+'.staticflickr.com/'+server+'/'+imgId+'_'+imgSec+'_m.jpg')
                                    ),
                                    $('<h2>').text(tit)
                                )
                    )

            })


        })

        .error(function(){
            alert('Fail to Load Flickr Images!!');
        })
    }

})

(() => {

    var actions = {
        birdFlies(key) {
                document.querySelector('[data-index="2"] .bird').style.transform = key ? `translateX(${window.innerWidth}px)` : "translateX(-100%)"
        },
        birdFlies2(key) {
            document.querySelector('[data-index="5"] .bird').style.transform = key ? `translate(${window.innerWidth}px, ${.7 * -window.innerHeight}px)` : "translateX(-100%)"
        }
    };

    console.log(actions)
    var stepElems = document.querySelectorAll('.step');
    var graphicElems = document.querySelectorAll('.graphic-item');
    var currentItem = graphicElems[0];
    var ioIndex;

    var io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1;
        console.log(ioIndex)
    });

    for (var i = 0; i < stepElems.length; i++) {

        io.observe(stepElems[i]);

        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    function activate(action) {
        currentItem.classList.add('visible');
        if(action){
            actions[action](true);
        }

    }
    function inactivate(action) {
        currentItem.classList.remove('visible');
        if(action){
            actions[action](false);
        }

    }

    window.addEventListener('scroll', () => {
        var step;
        var boundingRect;

        for (var i = ioIndex - 1; i < ioIndex + 2; i++) {
            step = stepElems[i];
            if (!step) continue;
            boundingRect = step.getBoundingClientRect();


            if (boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8) {
                // console.log(step.dataset.index)
                inactivate();
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }
    });

    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100);
    })

    activate();



})();
window.onload = function(){

    //카카오맵에 표시될 DOM지정
    // var container = document.getElementsByClassName('map')[i];
    var container = document.getElementById('map');

    //표시할 지역의 경도, 위도, 줌레벨 설정
    var options = {
        center: new daum.maps.LatLng( 37.5779636,126.9004205 ),
        level: 3
    };

    //map 인스턴스 생성
    var map = new daum.maps.Map(container, options);


    // 마커가 표시될 위치 
    var markerPosition  = new daum.maps.LatLng(37.5779636,126.9004205); 

    // 마커를 생성
    var marker = new daum.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);

    //스카이뷰 컨트롤 표시
    var mapTypeControl = new daum.maps.MapTypeControl();
    map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPLEFT);

    //줌 컨트롤 표시
    var zoomControl = new daum.maps.ZoomControl();
    map.addControl(zoomControl, daum.maps.ControlPosition.BOTTOMRIGHT);

    //드래그기능 활성화
    setDraggable(true);           
    function setDraggable(draggable) {
        map.setDraggable(draggable);    
    }

    //줌기능 활성화
    setZoomable(true);
    function setZoomable(zoomable) {          
        map.setZoomable(zoomable);    
    }

     //좌표값과 마커이미지 갯수만큼 반복을 돌며 마커생성하고 버튼 이벤트 연결
     var markerOptions = [
        {
            title: '본점',
            latlng: new daum.maps.LatLng(37.5779636,126.9004205),
            imgSrc : '../../img/sub/location/img/map.png',
            imgSize : new daum.maps.Size(246,108),
            imgPos : {offset: new kakao.maps.Point(123, 54)},
            button : document.getElementById('branch1')
        },         
        {
            title: '지점',
            latlng: new daum.maps.LatLng(37.505814,126.7509743),
            imgSrc : '../../img/sub/location/img/map2.png',
            imgSize : new daum.maps.Size(246,108),
            imgPos : {offset: new kakao.maps.Point(123, 54)},
            button : document.getElementById('branch2')
        },
        {
            title: '지점2',
            latlng: new daum.maps.LatLng(37.4976637,127.0258943),
            imgSrc : '../../img/sub/location/img/map2.png',
            imgSize : new daum.maps.Size(246,108),
            imgPos : {offset: new kakao.maps.Point(123, 54)},
            button : document.getElementById('branch3')
        }
    ];

    for(var i=0; i<markerOptions.length; i++){
        new daum.maps.Marker({
            map : map,
            position : markerOptions[i].latlng,
            title : markerOptions[i].title,
            image : new daum.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
        });    

        if(markerOptions[i].button){
            (function(index){
                markerOptions[index].button.onclick = function(){
                    moveTo(markerOptions[index].latlng);
                    console.log(index);
                }
            })(i);       
        }
    }    

    function moveTo(target){
        var moveLatLan = target;
        map.setCenter(moveLatLan);
        return false;
    }

    //교통정보 표시
    map.addOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);      

     //버튼클릭시 교통정보 표시    
     var t_on = document.getElementById('t_on');
     var t_off = document.getElementById('t_off');
 
     t_on.onclick = function(){
         map.addOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);
         return false;
     }
     t_off.onclick = function(){
         map.removeOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC); 
         return false;
     } 
    
    

   
   
}
$(function(){
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
    var key = 'AIzaSyCgyAlSbGZk2B639WPSBJN4KTa6YOM4EhU';
    var playlistId = 'PLOsYs4pmdGCtFMKEdXNt18wO3sID-Ex_N';

    load_youtube();
    
    function load_youtube(){
        $.ajax({
            url: URL,
            dataType: 'jsonp',

//data : option 지정
//https://developers.google.com/youtube/v3/docs/playlistItems/list?hl=ko

            data :{
                part: 'snippet',
                key: key,
                maxResults: 10,
                playlistId: playlistId
            }
        })
        .success(function(data){
            console.log(data);

            
            
            $(data.items).each(function(){

                var thumb = this.snippet.thumbnails.medium.url;
                var title = this.snippet.title;
                var details = this.snippet.description;
                var vid_id = this.snippet.resourceId.videoId;
                var date = this.snippet.publishedAt.substring(0,10);

                 $('.youtube ul')
                .append(
                    $('<li>')
                        .attr('data-vid', vid_id)
                        .append(
                            $('<div>')
                                .append(
                                    $('<img>').attr('src', thumb),
                                    $('<div class="details">')
                                        .append(
                                            $('<h2>').text(title),
                                            $('<p>').text(details),
                                            $('<span>').text(date)
                                        )
                                )      
                        )
                )
            })
           
            
        })
        .error(function(){
            alert('Fail to load Youtube data!!');
        })
    }

    $('body').on('click', '.youtube li', function(){

        var id= $(this).attr('data-vid');
        var tit =$(this).find('h2').text();
        var des =$(this).find('p').text();

        $('body')
            .append(
                $('<div class="imgPop">')
                    .css({
                        width : 1000,
                        padding : 50,
                        boxSizing : 'border-box',
                        position : 'fixed',
                        top : '50%',
                        left : '50%',
                        transform : 'translate(-50%, -50%)',
                        zIndex : 10,
                        backgroundColor : '#000',
                        borderRadius : '20px',
                    })
                    .append(
                        $('<iframe>')
                            .attr({
                                width : '100%',
                                height : 600,
                                src : 'https://www.youtube.com/embed/' + id
                            }),
                        $('<h2>').text(tit).css('color','#fff'),
                        $('<p>').text(des).css('color','#fff'),
                        $('<span>')
                            .append(
                                $('<i class="fas fa-times"></i>')
                            )
                    )
            )
    })

    $('body').on('mouseenter', '.youtube li', function(){
        $(this).children('div')
        .css({
            backgroundImage : 'linear-gradient(45deg, rgb(235, 133, 201), rgb(146, 189, 247))'
        })
    })
    $('body').on('mouseleave', '.youtube li', function(){
         $(this).children('div')
         .css({backgroundImage:' unset'
        })
    })



    $('body').on('click', '.imgPop span', function(){
        $('.imgPop').fadeOut(500, function(){
            $(this).remove();
        })
    })

    $('.imgPop').fadeOut(500, function(){
        $(this).remove();
    })
})
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
