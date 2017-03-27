function App(title, description, tags, url, imageUrl) {
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.url = url;
    this.imageUrl = imageUrl;
}

$(function(){
  //get the app details from json
  console.log((window.location.pathname).split("/").pop());

  $.get('views/apps/apps.json', function(app) {
    var $header = $('#app-header');

    app.forEach(function(d) {

      //create the app  object
      const app = new App(d.title, d.description, d.tags, d.url, d.imageUrl);

      //create the card
      $header.append('<a class="card" href="views/apps/college-majors.html"><div class="lead"><h3 class="title">' + app.title + '</h3></div><div class="image-wrapper"><img src="' + app.imageUrl + '" /></div><div class="description"><p>' + app.description + '</p></div></a>');
    });
  });
})
