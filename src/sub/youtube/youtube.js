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