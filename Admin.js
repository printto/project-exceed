$(document).ready(function() {
  var link = "http://158.108.165.223/data/group13/"

  var lastMotion = "0";
  var isOn = false;
  var isDead = false;
  var count = 0;
  var count2 = 0;
  var count3 = 0;

  <!-- Switch -->
  setInterval(function() {
    $.ajax({
      url: link + "1"
    }).done(function(data) {
      if (data == 0) {
        alarm_off();
        isDead = false;
        count2 = 0;
        isOn = false;
        if (count3 > 0) {
          count3--;
          $("#bar").append("<span class=\"barItem4\">A</span>");
        } else {
          count = 0;
          servo_off();
          $("#bar").append("<span class=\"barItem1\">A</span>");
        }
      } else if (data == 1 && count < 15) {
        isOn = true;
        count3 = 3;
        $("#bar").append("<span class=\"barItem2\">A</span>");
        count++;
      } else if (isDead){
        isOn = true;
        count3 = 3;
        servo_off();
        $("#bar").append("<span class=\"barItem3\">A</span>");
        count++;
      } else {
        isOn = true;
        count3 = 3;
        servo();
        $("#bar").append("<span class=\"barItem3\">A</span>");
        count++;
      }

      console.log("Check Switch");
    }).fail(function() {
      console.log("Check Switch fail");
    });
  }, 1000);

  <!-- Motion -->
  setInterval(function() {
    $.ajax({
      url: link + "2"
    }).done(function(data) {
      if (data == 1 || count == 0) {
        count2 = 0;
        alarm_off();
      } else if (data == 0 && count2 <= 3 && count != 0) {
        count2++;
      } else {
        alarm();
      }
      console.log("Check Motion");
    }).fail(function() {
      console.log("Check Motion fail");
    });
  }, 1000);

  var servo = function() {
    $.ajax({
      url: link + "3/set/1"
    }).done(function() {
      console.log("SentServo success");
    }).fail(function() {
      console.log("SentServo fail");
    });
  }

  var alarm = function() {
    $.ajax({
      url: link + "4/set/1"
    }).done(function() {
      servo_off();
      isDead = true;
      console.log("SentBuzzer success");
    }).fail(function() {
      console.log("Sent fail");
    });
  }

  var servo_off = function() {
    $.ajax({
      url: link + "3/set/0"
    }).done(function() {
      console.log("offServo success");
    }).fail(function() {
      console.log("offServo fail");
    });
  }

  var alarm_off = function() {
    $.ajax({
      url: link + "4/set/0"
    }).done(function() {
      count2 = 0;
      isDead = false;
      console.log("offBuzzer success");
    }).fail(function() {
      console.log("Sent fail");
    });
  }

  setInterval(function() {
    $('#time').text(count);
    if(count >= 100){
      $('#time').attr("style", "width: auto;");
    }
  }, 1);

  $("#warning").click(alarm_off);

  setInterval(function() {
    if(isDead){
      $('#warning').text("Caution detected! You stay still for too long. If everything is alright, please click to confirm.");
      $('#warning').attr("class", "w3-round-xxlarge w3-red");
      $('#warning').attr("style", "width: 400px; margin: auto; font-size: 20px; border-radius: 20px;")
    }
    else if (count < 1 && !isOn) {
      $('#warning').text("Status: Ready to use");
      $('#warning').attr("class", "w3-round-xxlarge w3-cyan");
      $('#warning').attr("style", "width: 250px; margin: auto; font-size: 20px;")
    }
    else if (count3 >= 0 && !isOn){
      $('#warning').text("Status: Waiting");
      $('#warning').attr("class", "w3-round-xxlarge w3-grey");
      $('#warning').attr("style", "width: 250px; margin: auto; font-size: 20px;")
    }
    else if (count < 7) {
      $('#warning').text("Status: Healthy");
      $('#warning').attr("class", "w3-round-xxlarge w3-green");
      $('#warning').attr("style", "width: 250px; margin: auto; font-size: 20px;")
    } else if (count < 10) {
      $('#warning').text("Status: Normal");
      $('#warning').attr("class", "w3-round-xxlarge w3-lime");
      $('#warning').attr("style", "width: 250px; margin: auto; font-size: 20px;")
    } else if (count < 13) {
      $('#warning').text("Status: Stress?");
      $('#warning').attr("class", "w3-round-xxlarge w3-yellow");
      $('#warning').attr("style", "width: 250px; margin: auto; font-size: 20px;")
    } else if (count < 16) {
      $('#warning').text("Please take a break");
      $('#warning').attr("class", "w3-round-xxlarge w3-orange");
      $('#warning').attr("style", "width: 250px; margin: auto; font-size: 20px;")
    } else {
      $('#warning').text("This is unhealthy. If you still continue to work, your health will be at risk.");
      $('#warning').attr("class", "w3-round-xxlarge w3-red");
      $('#warning').attr("style", "width: 400px; margin: auto; font-size: 20px; border-radius: 20px;")
    }
  }, 1);
});
