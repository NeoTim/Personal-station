$(function(){
  $('.rules').click(function(){
    $('.rule').fadeIn(150);
  });
  $('.close').click(function(){
    $('.rule').fadeOut(150);
  });

  $('.start').click(function(){           //主
      $(this).fadeOut();
      progressGo();
      startWolfAnimation();
  });
 function progressGo(){                      //处理进度条
   var timer=setInterval(function(){
     var progressWidth=$('.progress').width();
     progressWidth-=3;                              //为了测试
     $('.progress').width(progressWidth);
     if(progressWidth<=0){
       clearInterval(timer);
       $('.over').stop().fadeIn(150);
       stopWolfAnimation();
     }
   },1000);

 }

$('.reStart').click(function(){
  $('.over').fadeOut(150);
  $('.progress').width('180px');
    progressGo();
});         //监听重新开始按钮

var wolfTimer;
function startWolfAnimation(){
  var grayWolf=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
  var xhh=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
  var arrPos = [
    {left:"100px",top:"115px"},
    {left:"20px",top:"160px"},
    {left:"190px",top:"142px"},
    {left:"105px",top:"193px"},
    {left:"19px",top:"221px"},
    {left:"202px",top:"212px"},
    {left:"120px",top:"275px"},
    {left:"30px",top:"295px"},
    {left:"209px",top:"297px"}
  ];

    var $wolfImage = $("<img src='' class='wolfImage'>");
    var proIndex=Math.floor(Math.random()*9);    //9个坑
    $wolfImage.css({
      position:'absolute',
      left:arrPos[proIndex].left,
      top:arrPos[proIndex].top
    });
    var wolfGroup=Math.round(Math.random())==0 ? grayWolf : xhh;  //随机从两组狼中选
    window.wolfIndex=0;
    window.wolfIndexEnd=5;
    wolfTimer=setInterval(function(){
      if(wolfIndex>wolfIndexEnd){
        $wolfImage.remove();
        clearInterval(wolfTimer);
        startWolfAnimation();
      }
      $wolfImage.attr('src',wolfGroup[wolfIndex]);
      wolfIndex++;
    },300);

    $('.container').append($wolfImage);
    gameRules($wolfImage);
}        //开始动画

function stopWolfAnimation() {
    $(".wolfImage").remove();
    clearInterval(wolfTimer);
}

function gameRules($wolfImage){
  $wolfImage.one('click',function(){
    window.wolfIndex=6;
    window.wolfIndexEnd=9;        //在狼开始动画中会重新遍历
    var $src=$(this).attr('src');
    var who=$src.indexOf('h')>=0;  //没找到返回-1
     if(who)
        $(".score").text(parseInt($(".score").text()) + 10);
      else
        $(".score").text(parseInt($(".score").text()) - 10);
  });
}

});
