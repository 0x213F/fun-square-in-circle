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

    x += l/2;                 // xcoord for origin
    y += l/2;                 // ycoord for origin
    l = l/2 - l*padding/100;  // outter loop radius.

    // draw all the outter dots
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

    // tl;dr calculate polor coordinates of all inner points
    //
    // Each inner dot revolves around an origin, like the moon around the sun.
    // The position is represented in polar coordinates as a value from [0, 2PI)
    // and is then plotted relative to its relative origin. The "numberOfEdges" parameter
    // is a little misleading, but to the end user when a parameter is set to 4
    // an aliasing effect results in a square figure rotating in the middle
    // of the screen. In actuality, this parameter should be called "periods."
    // If you were to take the polar value of each inner dot
    // and plot them in a row on a linear plot you would see a periodic wave.
    // By changing the sampling rate of this wave you get an aliasing effect.
    // These aliasing effects create the cool animation effects.
    //
    // https://en.wikipedia.org/wiki/Aliasing#Sampling_sinusoidal_functions
    //
    var displacement = [];
    var subDots = numberOfDots / (numberOfEdges - 1);
    for(var i=0 ; i < numberOfDots ; i++) {
        displacement[i] = i % subDots / subDots * 2 * Math.PI;
    }

    // tl;dr initialize [x, y] displacement
    //
    // The previous displacement values are initial, to create movement the polar
    // coordinates need to shift by a constant determined by time. But wait,
    // our canvas is not quite polar form, so we have to start calculating things
    // with x and y coordinates.
    var x = 0,
        xdel = t%timeInterval/timeInterval * Math.PI * 2,
        y = 0,
        ydel = t%timeInterval/timeInterval * Math.PI * 2,
        l = 0,
        l2;

    // assign coordinates to center of screen
    if(canvas.width > canvas.height) {
        x = (canvas.width - canvas.height) / 2;
        l = canvas.height;
    } else {
        y = (canvas.height - canvas.width) / 2;
        l = canvas.width;
    }
    x += l/2;                       // xcoord for origin
    y += l/2;                       // ycoord for origin
    l2 = l/2 -l*padding/100;        // outter loop radius.
    l = l/2 - l*distance/100;       // inner loop radius.

    // draw all the inner dots
    for(var i=0 ; i < numberOfDots ; i++) {

        // the location of the origin relative to this point
        var xpos = Math.cos(i/numberOfDots * Math.PI * 2) * l,
            ypos = Math.sin(i/numberOfDots * Math.PI * 2) * l;

        // Outter circle coordinates xpos2 and ypos2 so we can
        // draw the line between the two dots. TODO This could
        // only be calculated once; restructure code so that inner
        // and outter dots are drawn in same function to run faster.
        var xpos2 = Math.cos(i/numberOfDots * Math.PI * 2) * l2,
            ypos2 = Math.sin(i/numberOfDots * Math.PI * 2) * l2,

        // These are the x and y coordinates being translated from
        // their polar coordinates calculated above.
            xdis = Math.cos(xdel - displacement[i]) * radius,
            ydis = Math.sin(ydel - displacement[i]) * radius;

        // Now we draw the line between the outter point and its corresponding
        // inner point. Throw in the point's polar value so we can calculated
        // a color value for the line as well.
        drawLines([x + xpos2, y + ypos2],
                  [x + xpos + xdis, y + ypos + ydis],
                  Math.atan( (ydis)/(xdis) ));

        // draw the dot with the same values used above for the drawLines(...) function.
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

    // turn radians into degrees, catch
    rad = rad / Math.PI * 180;
    if(rad < 0) {
        rad = 360 + rad;
    }

    // we are rounding colors to the memoized 360 values
    rad = Math.round(rad);

    // draw the line with color
    context.beginPath();
    context.moveTo(startPos[0], startPos[1]);
    context.lineTo(endPos[0], endPos[1]);
    context.lineWidth = 2

    // if the user doesn't want color, make the line solid
    if(color) {
        context.strokeStyle = colors[rad];
    } else {
        context.strokeStyle = "#FFF";
    }
    context.stroke();
}
