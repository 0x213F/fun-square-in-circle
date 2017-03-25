var sharableURL;

function updateNumberOfDots(value) {
  numberOfDots += value;
  document.getElementById("numberOfDots").innerHTML = numberOfDots;
  updateURL();
}

function updateNumberOfEdges(value) {
  numberOfEdges += value;
  document.getElementById("numberOfEdges").innerHTML = numberOfEdges;
  updateURL();
}

function updateTimeInterval(value) {
  // TODO make it so the animation doesn't jump
  timeInterval = value;
  document.getElementById("timeInterval").innerHTML = timeInterval;
  updateURL();
}

function updateRadius(value) {
  // TODO make it so the animation doesn't jump
  radius = value;
  document.getElementById("radius").innerHTML = radius;
  updateURL();
}

function updateDistance(value) {
  // TODO make it so the animation doesn't jump
  distance = value;
  document.getElementById("distance").innerHTML = distance;
  updateURL();
}

function updatePadding(value) {
  // TODO make it so the animation doesn't jump
  padding = value;
  document.getElementById("padding").innerHTML = padding;
  updateURL();
}

function updateURL() {
  sharableURL = location.protocol + '//' + location.host + location.pathname +
                "?numberOfDots=" + numberOfDots +
                "&numberOfEdges=" + numberOfEdges +
                "&timeInterval=" + timeInterval +
                "&padding=" + padding +
                "&distance=" + distance +
                "&radius=" +  radius +
                "&color=" + color;
  console.log(sharableURL);
}

function shareURL() {
  window.location.href = sharableURL;
}
