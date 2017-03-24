/*
  canvas.width     : width of the screen
  canvas.height    : height of the screen
  canvas                : used to manipulate the canvas
  context               : used to draw on the canvas
*/

var displacement = [];
var subDots = numberOfDots / numberOfEdges;
for(var i=0 ; i < numberOfDots ; i++) {
  displacement[i] = i % subDots / subDots * 2 * Math.PI;
}

function drawOutterDots() {
  // initialize [x, y] coords and length
  var x = 0,
      y = 0,
      l = 0;
  // assign coordinates to center of screen
  if(canvas.width > canvas.height) {
    x = (canvas.width - canvas.height) / 2;
    l = canvas.height;
  } else {
    y = (canvas.height - canvas.width) / 2;
    l = canvas.width;
  }
  x += l/2;
  y += l/2;
  l = l/2 - l/20; // 5% padding relative to canvas
  // draw
  context.beginPath();
  for(var i=0 ; i < numberOfDots ; i++) {
    var xpos = Math.cos(i/numberOfDots * Math.PI * 2) * l,
        ypos = Math.sin(i/numberOfDots * Math.PI * 2) * l;
    context.rect(x + xpos, y + ypos, 5, 5);
    context.stroke();
  }
}

// t - time in ms since the start of the animation
function drawInnerDots(t) {
  // initialize [x, y] coords and length
  var x = 0, xdel = t%timeInterval/timeInterval * Math.PI * 2,
      y = 0, ydel = t%timeInterval/timeInterval * Math.PI * 2,
      l = 0;
  // assign coordinates to center of screen
  if(canvas.width > canvas.height) {
    x = (canvas.width - canvas.height) / 2;
    l = canvas.height;
  } else {
    y = (canvas.height - canvas.width) / 2;
    l = canvas.width;
  }
  x += l/2;
  y += l/2;
  l = l/2 - l/4; // 25% padding relative to canvas
  // draw
  context.beginPath();
  for(var i=0 ; i < numberOfDots ; i++) {
    var xpos = Math.cos(i/numberOfDots * Math.PI * 2) * l,
        ypos = Math.sin(i/numberOfDots * Math.PI * 2) * l;
    xpos += Math.cos(xdel - displacement[i]) * 12.868;
    ypos += Math.sin(ydel - displacement[i]) * 12.868;
    context.rect(x + xpos, y + ypos, 5, 5);
    context.stroke();
  }
}

// t        - time in ms since the start of the animation
// startPos - tuple with x and y coords [x, y]
// endPos   - tuple with x and y coords [x, y]
function drawLines(t, startPos, endPos) {
  // TODO
}

resizeCanvas();
draw();
