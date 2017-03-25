/*
  canvas.width     : width of the screen
  canvas.height    : height of the screen
  canvas           : used to manipulate the canvas
  context          : used to draw on the canvas
*/

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

  x += l/2; // xcoord for origin
  y += l/2; // ycoord for origin
  l = l/2 - l/20; // outter loop radius. 5% padding relative to canvas
  // draw
  for(var i=0 ; i < numberOfDots ; i++) {
    var xpos = Math.cos(i/numberOfDots * Math.PI * 2) * l,
        ypos = Math.sin(i/numberOfDots * Math.PI * 2) * l;
    context.beginPath();
    context.arc(x + xpos, y + ypos, 2.5, 0, 2*Math.PI);
    context.strokeStyle = "#FFF";
    context.fillStyle = "#FFF";
    context.fill();
    context.stroke();
  }
}

// t - time in ms since the start of the animation
function drawInnerDots(t) {
  // calculate displacement of all inner points to show shape
  var displacement = [];
  var subDots = numberOfDots / (numberOfEdges - 1);
  for(var i=0 ; i < numberOfDots ; i++) {
    displacement[i] = i % subDots / subDots * 2 * Math.PI;
  }
  // initialize [x, y] coords and length
  var x = 0, xdel = t%timeInterval/timeInterval * Math.PI * 2,
      y = 0, ydel = t%timeInterval/timeInterval * Math.PI * 2,
      l = 0, l2;
  // assign coordinates to center of screen
  if(canvas.width > canvas.height) {
    x = (canvas.width - canvas.height) / 2;
    l = canvas.height;
  } else {
    y = (canvas.height - canvas.width) / 2;
    l = canvas.width;
  }
  x += l/2; // xcoord for origin
  y += l/2; // ycoord for origin
  l2 = l/2 -l/20; // outter loop radius. 5% padding
  l = l/2 - l/4; // inner loop radius. 25% padding relative to canvas
  // draw
  for(var i=0 ; i < numberOfDots ; i++) {

        // inner circle coordinates
    var xpos = Math.cos(i/numberOfDots * Math.PI * 2) * l,
        ypos = Math.sin(i/numberOfDots * Math.PI * 2) * l,

        // outter circle coordinates
        xpos2 = Math.cos(i/numberOfDots * Math.PI * 2) * l2,
        ypos2 = Math.sin(i/numberOfDots * Math.PI * 2) * l2,

        xdis = Math.cos(xdel - displacement[i]) * radius,
        ydis = Math.sin(ydel - displacement[i]) * radius;
    drawLines([x + xpos2, y + ypos2],
              [x + xpos + xdis, y + ypos + ydis],
              Math.atan( (ydis)/(xdis) ));
    context.beginPath();
    context.arc(x + xpos + xdis, y + ypos + ydis, 2.5, 0, 2*Math.PI);
    context.strokeStyle = "#FFF";
    context.fillStyle = "#FFF";
    context.fill();
    context.stroke();
  }
}

// t        - time in ms since the start of the animation
// startPos - tuple with x and y coords [x, y]
// endPos   - tuple with x and y coords [x, y]
function drawLines(startPos, endPos, rad) {
  rad = rad / Math.PI * 180;
  if(rad < 0) {
    rad = 360 + rad;
  }
  rad = Math.round(rad);
  context.beginPath();
  context.moveTo(startPos[0], startPos[1]);
  context.lineTo(endPos[0], endPos[1]);
  context.lineWidth = 2
  if(color) {
    context.strokeStyle = colors[rad];
  } else {
    context.strokeStyle = "#FFF";
  }
  context.stroke();
}
