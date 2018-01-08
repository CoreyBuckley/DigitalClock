//uses date to find time (which uses epoch) then displays and updates it onscreen. Uses a DOM approach.
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
  var numCalls = 0; //used for delaying the blink of the colon separating hrs and minutes
  updateTimeElement(clockEle, numCalls); //called once before setInterval so the elements get setup immediately on window load
  setInterval(function () { updateTimeElement(clockEle, numCalls); numCalls++; } , 1000);
}

function updateTimeElement(element, timesCalled) {
  if (element) {
    var time = new Date().toLocaleString().split(", ")[1]; //original format ex. "1/7/2018, 7:33:56 PM" after split ex. 7:32:51 AM
    var amOrPm = time.substr(-2,2); //starts from end-2 and length is 2
    time = (time.slice(0,-3)).split(":"); //gets rid of the " AM" or " PM" then splits based on ":" so we get components
    //reference for dif between substr and split:
    //https://stackoverflow.com/questions/2243824/what-is-the-difference-between-string-slice-and-string-substring
    //basically, substr(start,len); slice(start,end) where end can be negative; substr isn't best b/c len can't be negative
    var hrs = time[0];
    var minutes = time[1];
    var seconds = time[2];
    var timeParts = [hrs, ":", minutes, seconds, amOrPm]; //sequentially, how the time will be displayed onscreen
    for (var i = 0; i < timeParts.length; i++) {
      var correspondingElement = element.children[i];
      correspondingElement.innerText = timeParts[i];
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
