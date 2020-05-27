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