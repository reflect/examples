function App(title, description, tags, url, imageUrl) {
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.url = url;
    this.imageUrl = imageUrl;
}

$(function(){
  //include navbar
  $.get( 'views/layouts/navbar.html', function(data) {
    $( '#navbar' ).html(data);
  });

  //get the app details from json
  $.get('views/apps/apps.json', function(app) {
    var $list = $('.card-list');

    app.forEach(function(d) {

      //create the app  object
      const app = new App(d.title, d.description, d.tags, d.url, d.imageUrl);

      //create the card
      $list.append('<div class="card-wrapper"><a class="card" href=' + app.url +  '"><div class="lead"><h3 class="title">' + app.title + '</h3></div><div class="image-wrapper"><img src="' + app.imageUrl + '" /></div><div class="description"><p>' + app.description + '</p></div></a></div>');
    });
  });
})
