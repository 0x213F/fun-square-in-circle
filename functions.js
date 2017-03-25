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
    context.fillStyle = "#000";
    context.fill();
    context.stroke();
  }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
    context.beginPath();
    context.arc(x + xpos + xdis, y + ypos + ydis, 2.5, 0, 2*Math.PI);
    val1=Math.abs(Math.floor((Math.cos((t%(timeInterval*2)/(timeInterval*2)*i/numberOfDots) * Math.PI * 2)*170)))
    val2=Math.abs(Math.floor((Math.sin((t%(timeInterval*2)/(timeInterval*2)+i/numberOfDots) * Math.PI * 2)*150)))
    //val2=Math.abs(Math.floor((Math.cos((t%(timeInterval*2)/(timeInterval*2)+i/numberOfDots) * Math.PI * 2)*170)))
    color="#"+val1.toString(16)+val2.toString(16)+"5F";
    //console.log(color);
    context.fillStyle = "#000";
    context.fill();
    context.stroke();
    drawLines([x + xpos2, y + ypos2],
              [x + xpos + xdis, y + ypos + ydis],color);

  }
}

// t        - time in ms since the start of the animation
// startPos - tuple with x and y coords [x, y]
// endPos   - tuple with x and y coords [x, y]
function drawLines(startPos, endPos, color) {
  context.beginPath();
  context.moveTo(startPos[0], startPos[1]);
  context.lineTo(endPos[0], endPos[1]);
  context.lineWidth = 2
  context.strokeStyle = color;
  context.stroke();
}
