function updateNumberOfDots(value) {
  numberOfDots += value;
  document.getElementById("numberOfDots").innerHTML = numberOfDots;
}

function updateNumberOfEdges(value) {
  numberOfEdges += value;
  document.getElementById("numberOfEdges").innerHTML = numberOfEdges;
}

function updateTimeInterval(value) {
  // TODO make it so the animation doesn't jump
  timeInterval = value;
  document.getElementById("timeInterval").innerHTML = timeInterval;
}

function updateRadius(value) {
  // TODO make it so the animation doesn't jump
  radius = value;
  document.getElementById("radius").innerHTML = radius;
}

function updateDistance(value) {
  // TODO make it so the animation doesn't jump
  distance = value;
  document.getElementById("distance").innerHTML = distance;
}

function updatePadding(value) {
  // TODO make it so the animation doesn't jump
  padding = value;
  document.getElementById("padding").innerHTML = padding;
}
