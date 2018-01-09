//uses date to find time (which uses epoch) then displays and updates it onscreen. Uses a DOM approach.
"use strict"
var clockEle;
var time = {now: ""};

window.onload = function () {
  clockEle = document.getElementById("clock");
  clockEle.style.width = window.innerWidth + "px"; //set the clock container to the width of the screen
  clockEle.style.height = window.innerHeight + "px"; //set the clock container to the height of the screen
  updateTimeElement(clockEle);
}

function updateTimeElement(element) {
  if (element) {
    time.now = new Date().toLocaleString().split(", ")[1]; //original format ex. "1/7/2018, 7:33:56 PM" after split ex. 7:32:51 AM
    var amOrPm = time.pop(-3).trim(); //starts from end-3 " AM" or " PM" then gets rid of space
    var seconds = time.pop(-3).slice(1);
    var centiseconds = Math.floor((new Date().getMilliseconds())/10);
    var elements = element.children;
    var timeParts = [time.now, amOrPm, seconds, centiseconds];
    for (var i = 0; i < elements.length; i++) {
      elements[i].innerHTML = timeParts[i];
    }
    setTimeout(function () { updateTimeElement(element); }, 10); //update every centisecond. 1000 ms = 1 sec; 100 ms = 1 decisecond; 10 ms = 1 centisecond
  }
}

time.pop = function(begin) { //uses slice() but subtracts the slice from the original string. Can only use one index bc it fits my purpose
  var extracted = time.now.slice(begin);
  if (begin) { //this block modifies the string so it removes the section extracted
    if (begin < 0) {
      time.now = time.now.slice(0, time.now.length+begin); //if begin is neg, then the slice will be that or beyond index of the str. Thus, the rest of the string will go from 0 to the beginning
    }
    else {
      time.now = time.now.slice(0, begin);
    }
  }
  return extracted;
}
