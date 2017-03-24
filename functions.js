/*
  canvas.width     : width of the screen
  canvas.height    : height of the screen
  canvas           : used to manipulate the canvas
  context          : used to draw on the canvas
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
  for(var i=0 ; i < numberOfDots ; i++) {
    var xpos = Math.cos(i/numberOfDots * Math.PI * 2) * l,
        ypos = Math.sin(i/numberOfDots * Math.PI * 2) * l;
    context.beginPath();
    context.arc(x + xpos, y + ypos, 2.5, 0, 2*Math.PI);
    context.fillStyle = "#000";
    context.fill();
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
  for(var i=0 ; i < numberOfDots ; i++) {
    var xpos = Math.cos(i/numberOfDots * Math.PI * 2) * l,
        ypos = Math.sin(i/numberOfDots * Math.PI * 2) * l,
        xdis = Math.cos(xdel - displacement[i]) * 12.868,
        ydis = Math.sin(ydel - displacement[i]) * 12.868;
    context.beginPath();
    context.arc(x + xpos + xdis, y + ypos + ydis, 2.5, 0, 2*Math.PI);
    context.fillStyle = "#000";
    context.fill();
    context.stroke();
    //drawLines([x + xpos, y + ypos], // TODO
    //          [x + xpos + xdis, y + ypos + ydis]);
  }
}

// t        - time in ms since the start of the animation
// startPos - tuple with x and y coords [x, y]
// endPos   - tuple with x and y coords [x, y]
function drawLines(startPos, endPos) {
  context.beginPath();
  context.moveTo(startPos[0], startPos[1]);
  context.lineTo(endPos[0], endPos[1]);
  context.stroke();
}

resizeCanvas();
draw();
