var url = window.location.href.split('?'),
    params, item;
if(url.length > 1) {
  params = url[1].split('&');
  console.log(params);
  for(var i in params) {
    item = params[i].split('=');
    console.log(item);
  }

  // Mr-VS, append the following string to your URL.
  // You can change the variable names in the URL if you want too.
  //
  //
  // ?dots=12&edges=4&time=1300&padding=5

}
