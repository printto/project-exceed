$(document).ready(function() {
    var link = "http://158.108.165.223/data/group13/"

    var lastMotion = "0";
    var count = 0;
    var count2 = 0;

    setInterval(function() {
        $.ajax({
            url: link + "1"
        }).done(function(data) {
            if (data == 0) {
                count = 0;
                servo_off();
            } else if (data == 1 && count <= 11) {
                count++;
            } else {
                servo();
            }
            console.log("Check Switch");
        }).fail(function(){
            console.log("Check Switch fail");
          }
        );
    }, 1000);

    <!-- Motion -->
    setInterval(function() {
        $.ajax({
            url: link + "2"
        }).done(function(data) {
            if (data == 1 || count == 0) {
                count2 = 0;
                alarm_off();
            } else if (data == 0 && count2 <= 5 && count != 0) {
                count2++;
            } else {
                alarm();
            }
            console.log("Check Motion");
        }).fail(function(){
            console.log("Check Motion fail");
          }
        );
    }, 1000);

    var servo = function() {
        $.ajax({
            url: link + "3/set/1"
        }).done(function(){
            console.log("SentServo success");
          }
        ).fail(function(){
            console.log("SentServo fail");
          }
        );
    }

    var alarm = function() {
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

    var servo_off = function() {
        $.ajax({
            url: link + "3/set/0"
        }).done(function(){
            console.log("SentServo success");
          }
        ).fail(function(){
            console.log("SentServo fail");
          }
        );
    }

    var alarm_off = function() {
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
