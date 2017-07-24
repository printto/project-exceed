$(document).ready(function() {
  var link = "http://158.108.165.223/data/group13/"

  var lastMotion = "0";
  var isOn = false;
  var count = 0;
  var count2 = 0;
  var count3 = 0;

  <!-- Switch -->
  setInterval(function() {
    $.ajax({
      url: link + "1"
    }).done(function(data) {
      if (data == 0) {
        isOn = false;
        if (count3 > 0) {
          count3--;
        } else {
          count = 0;
          servo_off();
          $("#bar").append("<span class=\"barItem1\">A</span>");
        }
      } else if (data == 1 && count < 15) {
        isOn = true;
        count3 = 5;
        $("#bar").append("<span class=\"barItem2\">A</span>");
        count++;
      } else {
        isOn = true;
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
      } else if (data == 0 && count2 <= 5 && count != 0) {
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

  setInterval(function() {
    if (count < 1 && !isOn) {
      $('#warning').text("Status: Ready to use");
      $('#warning').attr("class", "w3-round-xxlarge w3-cyan");
    }
    else if (count3 >= 0 && !isOn){
      $('#warning').text("Status: Waiting");
      $('#warning').attr("class", "w3-round-xxlarge w3-grey");
    }
    else if (count < 5) {
      $('#warning').text("Status: Healthy");
      $('#warning').attr("class", "w3-round-xxlarge w3-green");
    } else if (count < 8) {
      $('#warning').text("Status: Normal");
      $('#warning').attr("class", "w3-round-xxlarge w3-lime");
    } else if (count < 11) {
      $('#warning').text("Status: Stress?");
      $('#warning').attr("class", "w3-round-xxlarge w3-yellow");
    } else if (count < 15) {
      $('#warning').text("Please take a break");
      $('#warning').attr("class", "w3-round-xxlarge w3-orange");
    } else {
      $('#warning').text("This is unhealthy. If you still continue to work, your health will be at risk.");
      $('#warning').attr("class", "w3-round-xxlarge w3-red");
      $('#warning').attr("style", "width: 400px; margin: auto; font-size: 20px; border-radius: 20px;")
    }
  }, 1);
});
