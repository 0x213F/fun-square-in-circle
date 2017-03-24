var canvas = document.getElementById('main'),
    context = canvas.getContext('2d'),
    resizeCanvas, draw;

window.addEventListener('resize', resizeCanvas, false);

resizeCanvas = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
}

draw = function() {
  // YOUR CODE HERE
}

resizeCanvas();

/*
    http://stackoverflow.com/questions/4288253/html5-canvas-100-width-height-of-viewport
*/
