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
  