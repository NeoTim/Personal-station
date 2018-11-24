$(function(){
  var ref=new Wilddog("https://wd6545407118xbblrl.wilddogio.com/");
  // var timer=[];
  var arr=[];
  $('.submit1').click(function(){
    // console.log(1);
     var speak=$('#speak').val();
    // console.log(speak);
    ref.child('message').push(speak);
    $('#speak').val('');
  });
  $("#speak").keypress(function(event) {
      if (event.keyCode == "13") {
        $(".submit1").trigger('click');
        event.preventDefault();              //阻止默认行为
      }
    });

  ref.child('message').on('child_added', function(snapshot) {
	    var text = snapshot.val();
      arr.push(text);
	    var danmu = $("<div class='danmu'></div>");
	    danmu.text(text);
	    $(".jumbotron").append(danmu);
      move(danmu);

	  });//点击事件

  $('.submit2').click(function(){
      ref.remove();
      arr=[];
      // $('.jumbotron').empty();
    });
  ref.on('child_removed', function() {
        // $('.danmu').remove();
        arr = [];
	    $('.jumbotron').empty();
      });

  var move=function(obj){
      var col = '#' + ((Math.random() * 0x1000000 << 0).toString(16));
      obj.css({
                color: col,
                top: (Math.floor(Math.random() * $('.jumbotron').height())) + "px",
                width:500,
                right: -500,
                display:'block',
                position:'absolute',
                fontSize:'20px'
            });
      var time = 10000 + 10000 * Math.random();
      obj.animate({right:'+=1500'},time,'linear',function(){
         obj.remove();
      });

      }

  var runDanMu = function(){
          if(arr.length > 0){
                var n = Math.floor(Math.random()* arr.length);
                var danmu = $("<div class='danmu'>"+arr[n]+"</div>");
                $(".jumbotron").append(danmu);
                 //console.log("loop:"+danmu.html());
                 move(danmu);
             }
          setTimeout(runDanMu,3000);
       }
       runDanMu();
   });
