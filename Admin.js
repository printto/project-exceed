$(document).ready(function() {
    var link = "http://158.108.165.223/data/group13/"

    var lastMotion = "0";
    var count = 0;

    setInterval(function() {
        $.ajax({
            url: link + "1"
        }).done(function(data) {
            if (data == 0) {
                count = 0;
            } else if (data == 1 && count <= 11) {
                count++;
            } else {
                alarm();
            }
            console.log("CheckSwitch");
        }).fail(function(){
            console.log("CheckSwitch fail");
          }
        );
    }, 1000);

    var alarm = function() {
        $.ajax({
            url: link + "3/set/1"
        }).done(function(){
            console.log("SentServo success");
          }
        ).fail(function(){
            console.log("SentServo fail");
          }
        );

        $.ajax({
            url: link + "4/set/1"
        }).done(function(){
            console.log("SentBuzzer success");
          }
        ).fail(function(){
            console.log("Sent fail");
          }
        );
    }

    var alarm_off = function() {
        $.ajax({
            url: link + "3/set/0"
        }).done(function(){
            console.log("SentServo success");
          }
        ).fail(function(){
            console.log("SentServo fail");
          }
        );

        $.ajax({
            url: link + "4/set/0"
        }).done(function(){
            console.log("SentBuzzer success");
          }
        ).fail(function(){
            console.log("Sent fail");
          }
        );
    }

    setInterval(function() {
      $('#time').text(count);
    },1);

});
