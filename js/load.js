function loadURLvariables() {
    var url = window.location.href.split('?'),
        params, item;
    if(url.length > 1) {
        params = url[1].split('&');
        for(var i in params) {
            item = params[i].split('=');
            window[item[0]] = Number(item[1]);
            if(item[1] === "true") {
                window[item[0]] = true;
            } else if(item[1] === "false") {
                window[item[0]] = false;
            }
        }
    }
    document.getElementById("numberOfDots").innerHTML = numberOfDots;
    document.getElementById("numberOfEdges").innerHTML = numberOfEdges;
    document.getElementById("timeInterval").innerHTML = timeInterval;
    document.getElementById("padding").innerHTML = padding;
    document.getElementById("distance").innerHTML = distance;
    document.getElementById("radius").innerHTML = radius;
}
