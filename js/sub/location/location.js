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