//active features with links
var featureUrls = {
  custom_colors: "https://reflect.io/docs/platform/embedding#Customcolors",
  filters: "https://reflect.io/docs/platform/embedding#Filters",
  formatters: "https://reflect.io/docs/platform/embedding#Formatters",
  interaction: "https://reflect.io/docs/platform/embedding#Interactions",
  custom_controls: "https://reflect.io/docs/platform/embedding#CustomizingyourReflectviews"
}

$(function(){
  //retrieve path name
  var path = (window.location.pathname).split("/").pop().split(".")[0];

  $.get('../json/apps.json', function(data) {
    //find the app details
    var app = data.find(function(item) {
      return item.name === path;
    });

    //update page title
    var $title = $('#app-title');

    $title.text(app.title);

    //load theme
    var $theme = $('#app-theme');
    var themeURL = 'themes/' + app.theme + '.css'

    $theme.attr('href', themeURL);

    //build features list
    var features = [];

    (app.features).forEach(function(feature) {
      var featureId = feature.split(' ').join('_');
      var link = featureUrls[featureId];
      features.push('<a class="' + featureId + '" href="' + link + '">' + feature + '</a>');
    });

    features = features.sort().join('');

    //populate the instructions
    var $instruction = $('#app-instruction');

    $instruction.prepend(`
      <small class="instruction"><strong>First</strong>: ` + app.mainGoal + `</small><br>
      <small class="instruction"><strong>Then</strong>: ` + app.secondaryGoal + `</small>
    `);

    //populate the header
    var $header = $('#app-header');

    $header.append(`
      <div class="lead">
        <h1>` + app.title + `</h1>
        <h2>` + app.description + `</h2>
      </div>
      <div class="resources">
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
