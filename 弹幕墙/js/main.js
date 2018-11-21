$(function(){
  var ref=new Wilddog("https://wd6545407118xbblrl.wilddogio.com/");

  var timer=[];
  $('.submit1').click(function(){
    // console.log(1);
     var speak=$('#speak').val();
    // console.log(speak);
    ref.child('message').push(speak);
    $('#speak').val('');
    move();
  });
    var danmu;
    ref.child('message').on('child_added', function(snapshot) {
	    var txt = snapshot.val();
	    danmu = $("<div class='danmu'></div>");
	    danmu.text(txt);
	    $(".jumbotron").append(danmu);
      danmu.css({
                position:'absolute',
                fontSize:'20px',
                display:'block'
            });
      var col = '#' + ((Math.random() * 0x1000000 << 0).toString(16));
      danmu.css({
                color: col,
                top: (Math.floor(Math.random() * $('.jumbotron').height())-24) + "px",
                width:danmu.width(),
                right: 0
            });

	  });//点击事件

    $('.submit2').click(function(){
      ref.remove();
    });
    ref.on('child_removed', function() {
        $('.danmu').remove();
      });

    function move(){
        var i = 0;
        var timer = setInterval(function() {
            danmu.css({
                right: (i += 1) + "px"
            });
            if ((danmu.offset().left + danmu.width()) < $('.jumbotron').offset().left) {
                danmu.remove();
                clearInterval(timer);
            }
        }, 10);

     };
   });
