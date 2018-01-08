//uses system clock
"use strict"
var clockEle;
var hoursEle;
var colonEle;
var minutesEle;
var COLON_BLINK_DELAY = 1; //only in seconds


window.onload = function () {
  clockEle = document.getElementById("clock");
  clockEle.style.width = window.innerWidth + "px"; //set the clock container to the width of the screen
  clockEle.style.height = window.innerHeight + "px"; //set the clock container to the height of the screen
  var numCalls = 0;
  updateTimeElement(clockEle, numCalls);
  setInterval(function () { updateTimeElement(clockEle, numCalls); numCalls++; } , 1000);
}

function updateTimeElement(element, timesCalled) {
  if (element) {
    var minuteFormat = new Intl.NumberFormat('en-US', {
      minimumIntegerDigits: 2
    })
    var date = new Date();
    var hrs = date.getHours();
    var minutes = minuteFormat.format(date.getMinutes());
    var seconds = minuteFormat.format(date.getSeconds());
    var amOrPm;
    if (hrs > 12) {
      amOrPm = "PM";
      hrs -= 12;
    }
    else {
      amOrPm = "AM";
    }
    var time = [hrs, ":", minutes, seconds, amOrPm];
    for (var i = 0; i < time.length; i++) {
      var correspondingElement = element.children[i];
      correspondingElement.innerText = time[i];
      if (correspondingElement.id == "colon") {
        blinkColon(correspondingElement, timesCalled);
      }
    }
  }

}

function blinkColon(colon, seconds) {
  if (seconds % COLON_BLINK_DELAY == 0) {
    colon.style.visibility = (colon.style.visibility == "collapse") ? "visible" : "collapse";
  }
}
