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
  x += l/2;
  y += l/2;
  l = l/2 - l/20; // 5% padding relative to canvas
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
  x += l/2;
  y += l/2;
  l2 = l/2 -l/20; // 5% padding, change it later
  l = l/2 - l/4; // 25% padding relative to canvas
  // draw
  for(var i=0 ; i < numberOfDots ; i++) {
    var xpos = Math.cos(i/numberOfDots * Math.PI * 2) * l,
        ypos = Math.sin(i/numberOfDots * Math.PI * 2) * l,

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
  context.strokeStyle = colors[rad];
  context.stroke();
}

function hsv2rgb(hue, saturation, value) {
  let chroma = value * saturation;
  let hue1 = hue / 60;
  let x = chroma * (1- Math.abs((hue1 % 2) - 1));
  let r1, g1, b1;
  if (hue1 >= 0 && hue1 <= 1) {
    ([r1, g1, b1] = [chroma, x, 0]);
  } else if (hue1 >= 1 && hue1 <= 2) {
    ([r1, g1, b1] = [x, chroma, 0]);
  } else if (hue1 >= 2 && hue1 <= 3) {
    ([r1, g1, b1] = [0, chroma, x]);
  } else if (hue1 >= 3 && hue1 <= 4) {
    ([r1, g1, b1] = [0, x, chroma]);
  } else if (hue1 >= 4 && hue1 <= 5) {
    ([r1, g1, b1] = [x, 0, chroma]);
  } else if (hue1 >= 5 && hue1 <= 6) {
    ([r1, g1, b1] = [chroma, 0, x]);
  }

  let m = value - chroma;
  let [r,g,b] = [r1+m, g1+m, b1+m];

  // Change r,g,b values from [0,1] to [0,255]
  return "rgb(" + Math.round(255*r).toString() +","+ Math.round(255*g).toString() +","+ Math.round(255*b).toString() +")";
}
var fff = []
for(var i=0;i<360;i++) {
	fff[i] = hsv2rgb(i,1,1)
}
