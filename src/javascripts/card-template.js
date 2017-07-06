$(function(){
  //get the app details from json
  $.get('./src/json/examples.json', function(app) {
    var $list = $('.card-list');

    var ignoredApps = ['top-influencers', 'sample-prospector'];

    app.forEach(function(d) {
      if (ignoredApps.indexOf(d.category) < 0) {
        var title = d.category.replace(/-/g, ' ');

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
              <a href="./` + d.category + `">
                <div class="image-wrapper">
                  <img src="./` + d.category + `/` + d.name + `.png" />
                </div>
                <div class="content">
                  <h3 class="title">` + title + `</h3>
                  <p class="description">` + d.description + `</p>
                </div>
              </a>
              <div class="features">
                ` + features + `
              </div>
            </div>
          </div>
        `);
      }
    });

    //force grid at any length
    var visibleApps = Object.keys(app).length - Object.keys(ignoredApps).length;
    if (visibleApps < 3) {
      //if number of apps is less than 3 do nothing to center
    } else if ((visibleApps - 2) % 3 === 0) {
      //if 2 more than multiple of 3, add one more
      $list.append('<div class="card-filler desktop-only"></div>');
    } else if ((visibleApps - 1) % 3 === 0) {
      //if 1 more than multiple of 3, add two more
      $list.append('<div class="card-filler desktop-only"></div><div class="card-filler desktop-only"></div>');
    }

    //card hover effect
    $('.card').mouseenter(function() {
      $('.card').not(this).addClass('inactive');
      $(this).removeClass('inactive');
    })

    $('.card-container').mouseleave(function() {
      $('.card').not(this).removeClass('inactive');
    })

    //GITHUB VISITED
    var githubFooter = document.getElementById('github-footer');
    analytics.trackLink(githubFooter, 'GitHub visited', {
      example: 'home',
      category: 'home',
      features: ['all'],
      location: 'footer'
    });
    var githubHeader = document.getElementById('github-header');
    analytics.trackLink(githubHeader, 'GitHub visited', {
      example: 'home',
      category: 'home',
      features: ['all'],
      location: 'header'
    });
  });
})
