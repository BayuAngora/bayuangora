if (window.location.hash)
    scroll(0,0);
setTimeout(function(){scroll(0,0);},1);
$(function(){
$(".scroll").on("click",function(e){
    e.preventDefault();
    $("html,body").animate({
        scrollTop:$($(this).attr("href")).offset().top + "px"
    },1000,"swing");
});
if(window.location.hash){
    $("html,body").animate({
        scrollTop:$(window.location.hash).offset().top + "px"
        },1000,"swing");
    }
});
