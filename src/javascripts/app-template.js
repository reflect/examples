//feature links
var featureUrls = {
  custom_colors: "https://reflect.io/docs/platform/embedding#Customcolors",
  filters: "https://reflect.io/docs/platform/embedding#Filters",
  parameters: "https://reflect.io/docs/platform/embedding#Parameters",
  formatters: "https://reflect.io/docs/platform/embedding#Formatters",
  interaction: "https://reflect.io/docs/platform/embedding#Interactions",
  custom_controls: "https://reflect.io/docs/platform/embedding#CustomizingyourReflectviews"
}

$(function(){
  //retrieve path name
  var path = (window.location.pathname).match('\/(.*?)\/')[1];

  $.get('../../src/json/examples.json', function(data) {

    //find the app details
    var app = data.find(function(option) {
      return option.category === path;
    });

    //update page title
    var title = app.category.replace(/-/g, ' ');
    var $title = $('#app-title');

    $title.text(title);

    //load theme
    var $theme = $('#app-theme');
    var theme = '../themes/' + app.theme + '.css'

    $theme.attr('href', theme);

    //load navbar
    // var $navbar = $('#navbar');
    //
    // $navbar.html(`
    //   <a href="/">
    //     <img class="logo" src="../../images/reflect-logo-bw.svg" alt="Reflect logo">
    //   </a>
    // `);

    //build features list
    var features = [];

    (app.features).forEach(function(feature) {
      var featureId = feature.split(' ').join('_');
      var link = featureUrls[featureId];
      features.push('<a class="feature ' + featureId + '" href="' + link + '">' + feature + '</a>');
    });

    features = features.sort().join('');

    //populate the instructions
    var $instruction = $('#app-instruction');

    $instruction.html(`
      <small class="instruction desktop-only"><strong>First</strong>: ` + app.mainGoal + `</small><br>
      <small class="instruction desktop-only"><strong>Then</strong>: ` + app.secondaryGoal + `</small>
    `);

    //populate the header
    var $header = $('#app-header');

    $header.append(`
      <a class="fork-me desktop-only" href="` + app.github + `">
        <img src="https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png">
      </a>
      <div class="lead">
        <h1 class="title">` + title + `</h1>
        <h2>` + app.description + `</h2>
      </div>
      <div class="resources desktop-only">
        <div class="features">
          <h6>Features</h6>
          ` + features + `
        </div>
        <div class="theme">
          <h6>Theme</h6>
          <a href="#">` + app.theme + `</a>
        </div>
        <div class="dataset">
          <h6>Dataset</h6>
          <a href="#">` + app.dataset + `</a>
        </div>
      </div>
    `);
  });
})
