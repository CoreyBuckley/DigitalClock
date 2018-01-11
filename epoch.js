//uses date to find time (which uses epoch) then displays and updates it onscreen. Uses a DOM approach.
"use strict"
var clockEle;
var time = {now: ""};
var allowBlink, allowSeconds, allowCentiseconds;
var MS_REFRESH_RATE = 10; //in milliseconds
var CALLS_IN_SECOND = 1000/MS_REFRESH_RATE;
var numCalls = 0;
var displayOptions = ["none","inline-block"]; //two options we will alternate between for the corresponding booleans

window.onload = function () {
  clockEle = document.getElementById("clockContainer");
  clockEle.style.width = window.innerWidth + "px"; //set the clock container to the width of the screen
  clockEle.style.height = window.innerHeight + "px"; //set the clock container to the height of the screen
  allowBlink = allowCentiseconds = false;
  allowSeconds = true;
  if (clockEle) { //make sure the HTML container is there
    updateTimeElement(clockEle);
  }
  else {
    console.error("There is no element with 'clockContainer' tag.");
  }
}

window.onresize = function () { // make sure the clock is centered even if the window is resized to something else after load
  clockEle.style.width = window.innerWidth + "px";
  clockEle.style.height = window.innerHeight + "px";
}

function updateTimeElement(element) { //main loop
  if (element) {
    time.now = new Date().toLocaleString().split(", ")[1]; //original format ex. "1/7/2018, 7:33:56 PM" after split ex. 7:32:51 AM
    var amOrPm = time.pop(-3).trim(); //starts from end-3 " AM" or " PM" then gets rid of space
    var split = time.now.split(":");
    var hrs = split[0];
    var mins = split[1];
    var seconds = allowSeconds ? split[2] : "";
    var centiseconds = allowCentiseconds ? Math.floor((new Date().getMilliseconds())/10) : "";
    var elements = element.children;
    var timeParts = [hrs, ":", mins, amOrPm, seconds, centiseconds]; //the sequential format in which the time will be displayed
    for (var i = 0; i < elements.length; i++) {
      var elementTimePart = elements[i];
      if (elementTimePart.id == "colon") {
        setColonVisibility(elementTimePart, allowBlink);
      }
      if (elementTimePart.id == "seconds") {
        setElementDisplayOption(elementTimePart, allowSeconds);
      }
      if (elementTimePart.id == "centiseconds") {
        setElementDisplayOption(elementTimePart, allowCentiseconds);
      }
      elementTimePart.innerHTML = timeParts[i];
    }
    setTimeout(function () { updateTimeElement(element); }, MS_REFRESH_RATE); //update every centisecond. 1000 ms = 1 sec; 100 ms = 1 decisecond; 10 ms = 1 centisecond
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

function toggleBlink() {
  allowBlink = !allowBlink;
}

function blink(ele, colon) {
  if (numCalls>=CALLS_IN_SECOND) { //~ every second, colon changes state
    ele.style.visibility = (ele.style.visibility == "collapse") ? "visible" : "collapse";
    numCalls = 0; //reset counter when condition reached
  }
  else {
    numCalls++
  }
}

function setColonVisibility(ele, bool) { //function so that the user won't have to try and time their click to when the colon is visible
  if (allowBlink) {
    blink(ele);
  }
  else {
    ele.style.visibility = "visible";
  }
}

function toggleSeconds() {
  allowSeconds = !allowSeconds;
}

function toggleCentiseconds() {
  allowCentiseconds = !allowCentiseconds;
}

function setElementDisplayOption(ele, bool) {
  ele.style.display = displayOptions[Number(bool)]; //could use ternary, but this is more readable I think
}

function setElementVisibleOption(ele, bool) {
  ele.style.visible = visibleOptions[Number(bool)];
}

function toggleCheckmarkIcon(callerEle) {
  if (callerEle) {
    var iconEle = callerEle.firstElementChild; //so long as the option's first element child is the icon container
    if (iconEle.className == "fa fa-check-square-o") {
      iconEle.className = "fa fa-square-o";
    }
    else {
      iconEle.className = "fa fa-check-square-o";
    }
  }
}
