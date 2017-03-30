////feature links
var featureUrls = {
  custom_colors: "https://reflect.io/docs/platform/embedding#Customcolors",
  filters: "https://reflect.io/docs/platform/embedding#Filters",
  parameters: "https://reflect.io/docs/platform/authentication#Parameterizedviews",
  formatters: "https://reflect.io/docs/platform/embedding#Formatters",
  interactions: "https://reflect.io/docs/platform/embedding#Interactions",
  custom_controls: "https://reflect.io/docs/platform/embedding#CustomizingyourReflectviews",
  custom_components: "https://reflect.io/docs/platform/embedding#Customcomponenttypes",
  dates: "https://reflect.io/docs/platform/embedding#Dateranges"
}

$(function(){
  //retrieve path name
  var path = (window.location.pathname).match('\/(.*?)\/')[1];

  $.get('../../src/json/examples.json', function(data) {

    var appId;
    //find the relevant app and index
    var app = data.find(function(option, i) {
      appId = i;
      return option.category === path;
    });

    //find the neighboring apps
    var prev = appId > 0 ? data[appId-1] : data[data.length-1];
    var next = data.length > appId+1 ? data[appId+1] : data[0];

    //update page title
    var title = app.category.replace(/-/g, ' ');
    title = title.substr(0,1).toUpperCase() + title.substr(1);
    var $title = $('#app-title');

    $title.text('Reflect / ' + title);

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
      <small class="instruction"><strong>1</strong> ` + app.mainGoal + `</small><br>
      <hr><small class="instruction"><strong>2</strong> ` + app.secondaryGoal + `</small>
    `);

    //populate the header
    var $header = $('#app-header');

    $header.append(`
      <a class="fork-me desktop-only" href="https://github.com/reflect/examples/blob/master/apps/` + app.name + `">
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
          <a href="https://github.com/reflect/examples/blob/master/apps/themes/` + app.theme + `.scss">` + app.theme + `</a>
        </div>
        <div class="dataset">
          <h6>Dataset</h6>
          <a href="#">` + app.dataset + `</a>
        </div>
      </div>
    `);

    //populate the navigation
    var $navigation = $('#app-navigation');
    var prevTitle = prev.category.replace(/-/g, ' ');
    var nextTitle = next.category.replace(/-/g, ' ');

    $navigation.html(`
      <a class="prev" href="/` + prev.category + `">
        <strong>〈</strong>
        <span class="navTitle">` + prevTitle + `</span>
        <span class="defaultTitle hidden">Previous</span>
      </a>
      <a class="next" href="/` + next.category + `">
        <span class="navTitle">` + nextTitle + `</span>
        <span class="defaultTitle hidden">Next</span>
        <strong>〉</strong>
      </a>
    `);

    //Change nav content to fit across sizes
    function fitNavigation() {
      if ($(window).width() <= 799) {
        $('.defaultTitle').removeClass('hidden');
        $('.navTitle').addClass('hidden');
      }
      else {
        $('.defaultTitle').addClass('hidden');
        $('.navTitle').removeClass('hidden');
      }
    }

    fitNavigation();

    $(window).on('resize', function() {
      fitNavigation();
    });
  });
})
