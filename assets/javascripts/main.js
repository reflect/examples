$(function(){
  //get the app details from json
  $.get('./json/apps.json', function(app) {
    var $list = $('.card-list');

    app.forEach(function(d) {

      //build features list
      var features = [];

      (d.features).forEach(function(feature) {
        var featureId = feature.split(' ').join('_');
        features.push('<p class="feature ' + featureId + '">' + feature + '</p>');
      });

      features = features.sort().join('');

      //create the card
      $list.append(`
        <div class="card-wrapper">
          <div class="card">
            <a href="/apps/` + d.name + `.html">
              <div class="image-wrapper">
                <img src="/images/apps/` + d.name + `.png" />
              </div>
              <div class="content">
                <h3 class="title">` + d.title + `</h3>
                <p class="description">` + d.description + `</p>
              </div>
            </a>
            <div class="features">
              ` + features + `
            </div>
          </div>
        </div>
      `);
    });

    //force grid at any length
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
      $('.card').not(this).addClass('inactive');
      $(this).removeClass('inactive');
    })

    $('.card-container').mouseleave(function() {
      $('.card').not(this).removeClass('inactive');
    })
  });
})
