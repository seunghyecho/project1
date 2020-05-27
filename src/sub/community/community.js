$(document).ready(function(){
    console.log('sub community');
    $("tr.que").on("click", function (e) {
        e.preventDefault();
        // console.log(e.target);
        $(this).next().toggle();
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        
    });
})