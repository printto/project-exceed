$(document).ready(function() {

  var link = "http://158.108.165.223/data/group13/"

  setInterval(function() {
    $.ajax({
      url: link + "1"
    }).done(function(data) {
      $("#switch").text(data);
      console.log("Check Switch");
    }).fail(function() {
      console.log("Check Switch fail");
    });
  }, 1000);

  setInterval(function() {
    $.ajax({
      url: link + "2"
    }).done(function(data) {
      $("#motion").text(data);
      console.log("Check Motion");
    }).fail(function() {
      console.log("Check Motion fail");
    });
  }, 1000);

  setInterval(function() {
    $.ajax({
      url: link + "3"
    }).done(function(data) {
      $("#servo").text(data);
      console.log("Check Servo");
    }).fail(function() {
      console.log("Check Servo fail");
    });
  }, 1000);

  setInterval(function() {
    $.ajax({
      url: link + "4"
    }).done(function(data) {
      $("#buzzer").text(data);
      console.log("Check Buzzer");
    }).fail(function() {
      console.log("Check Buzzer fail");
    });
  }, 1000);

});
