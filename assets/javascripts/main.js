function App(title, description, tags, url, imageUrl) {
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.url = url;
    this.imageUrl = imageUrl;
}

$(function(){
  //include navbar
  $.get('views/layouts/navbar.html', function(data) {
    $('#navbar').html(data);
  });

  //get the app details from json
  $.get('views/apps/apps.json', function(app) {
    var $list = $('.card-list');

    app.forEach(function(d) {

      //create the app  object
      const app = new App(d.title, d.description, d.tags, d.url, d.imageUrl);

      //create the card
      $list.append('<a class="card" href="views/apps/college-majors.html"><div class="lead"><h3 class="title">' + app.title + '</h3></div><div class="image-wrapper"><img src="' + app.imageUrl + '" /></div><div class="description"><p>' + app.description + '</p></div></a>');
    });

    //force grid
    if (Object.keys(app).length < 3) {
      //if number of apps is less than 3 do nothing to center
    } else if (Object.keys(app).length % 2 === 1) {
      //if odd number of apps, add one more
      $list.append('<div class="card-filler"></div>');
    } else if (Object.keys(app).length % 2 === 0) {
      //if even number of apps, add two more
      $list.append('<div class="card-filler"></div><div class="card-filler"></div>');
    }

    //card hover effect
    $('.card').mouseenter(function() {
      $(this).removeClass('on-hover');
      $(this).siblings().addClass('on-hover');
    })

    $('.card-container').mouseleave(function() {
      $('.card').removeClass('on-hover');
    })
  });
})
