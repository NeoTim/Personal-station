$(function(){

  $('.nav>li').on('click',function(){
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
  });

  $(window).scroll(function(){
    var offset=$('html,body').scrollTop(); /*偏移位*/
    if(offset>=300){
      $('.jx').fadeOut(1000);
    }else {
      $('.jx').fadeIn(1000)
    }
  });

});
