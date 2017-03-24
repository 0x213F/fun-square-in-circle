var canvas = document.getElementById('main'),
    context = canvas.getContext('2d'),
    numberOfDots = 50,
    startTime = Date.now();

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawOutterDots();
}

function draw() {
  requestAnimationFrame(draw);
  var t = Date.now() - startTime;
  drawInnerDots(t);
  drawLines(t);
}

draw();
resizeCanvas();

/*
    http://stackoverflow.com/questions/4288253/html5-canvas-100-width-height-of-viewport
*/
