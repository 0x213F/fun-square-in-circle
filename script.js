var canvas = document.getElementById('main'),
    context = canvas.getContext('2d'),
    numberOfDots = 48,
    numberOfEdges = 4,
    timeInterval = 1300,
    padding = 5;
    distance = 20;
    radius = 13,
    color = true;
    startTime = Date.now();

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
}

function draw() {
  requestAnimationFrame(draw);
  var t = Date.now() - startTime;
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawInnerDots(t);
  drawOutterDots(); // TODO do not redraw every frame
}

/*
    http://stackoverflow.com/questions/4288253/html5-canvas-100-width-height-of-viewport
*/
