////feature links
var featureUrls = {
  custom_colors: "https://reflect.io/docs/platform/embedding#Customcolors",
  filters: "https://reflect.io/docs/platform/embedding#Filters",
  parameters: "https://reflect.io/docs/platform/authentication#Parameterizedviews",
  theming: "https://reflect.io/docs/platform/theming",
  formatters: "https://reflect.io/docs/platform/embedding#Formatters",
  interactions: "https://reflect.io/docs/platform/embedding#Interactions",
  custom_controls: "https://reflect.io/docs/platform/embedding#CustomizingyourReflectviews",
  custom_components: "https://reflect.io/docs/platform/embedding#Customcomponenttypes",
  dates: "https://reflect.io/docs/platform/embedding#Dateranges",
  template: "https://github.com/reflect/examples/tree/master/apps"
}

$(function(){
  //retrieve path name and drop last /
  var path = window.location.pathname.slice(0, -1);
  //category is substring after last /
  var category = path.substring(path.lastIndexOf("/")+1, path.length);

  $.get('../src/json/examples.json', function(data) {

    var appId;
    //find the relevant app and index
    var app = data.find(function(option, i) {
      appId = i;
      return option.category === category;
    });

    //find the neighboring apps
    var prev = appId > 0 ? data[appId-1] : data[data.length-1];
    var next = data.length > appId+1 ? data[appId+1] : data[0];

    //remove custom demos from navigation
    if (prev.category === 'top-influencers' || prev.category === 'MarTech-2017') {
      prev = data[data.length-3];
    } else if (next.category === 'top-influencers' || next.category === 'MarTech-2017') {
      next = data[0];
    }

    //update page title
    var title;
    //extra regex to prep top-influencers title from url params
    if (app.category === 'top-influencers' && location.search.substr(1)) {
      var company = location.search.substr(1).match(/[^&]*/)[0];
      title = company.replace(/%20/g, ' ') + '\'s ' + app.category.replace(/-/g, ' ');
    } else {
      title = app.category.replace(/-/g, ' ');
      title = title.substr(0,1).toUpperCase() + title.substr(1);
    }
    var $title = $('#app-title');

    //append Reflect to page specific title
    $title.text(title + ' / Reflect');

    //build features list
    var features = [];

    (app.features).forEach(function(feature) {
      var featureId = feature.split(' ').join('_');
      var link = featureUrls[featureId];
      features.push('<a target="_blank" class="feature ' + featureId + '" href="' + link + '">' + feature + '</a>');
    });

    features = features.sort().join('');

    //build dataset link
    var dataset = app.dataset;
    var datasetLink;

    if (dataset === 'default') {
      datasetLink = '<p>Default sample connection</p>';
    } else if (dataset === 'klout') {
      datasetLink = '<p>Klout API</p>';
    } else {
      datasetLink = `<a id="dataset-download" href="https://cdn.reflect.io/datasets/` + dataset + `">` + dataset + `</a>`;
    }

    //populate the instructions
    var $instruction = $('#app-instruction');

    $instruction.html(`
      <small class="instruction"><strong>1</strong> ` + app.mainGoal + `</small><br>
      <hr><small class="instruction"><strong>2</strong> ` + app.secondaryGoal + `</small>
    `);

    //populate the header
    var $header = $('#app-header');
    var githubLink = `https://github.com/reflect/examples/blob/master/apps/` + app.category + `/` + app.name + `.html`;

    $header.append(`
      <a id="github-header" target="_blank" class="fork-me desktop-only" href="` + githubLink + `">View on GitHub</a>
      <div class="lead">
        <h1 class="title">` + title + `</h1>
        <h2>` + app.description + `</h2>
      </div>
      <div class="resources desktop-only">
        <div class="features">
          <h6>Features</h6>
          ` + features + `
        </div>
        <div class="dataset">
          <h6>Dataset</h6>
          ` + datasetLink + `
        </div>
      </div>
    `);

    //populate the navigation
    var $navigation = $('#app-navigation');
    var prevTitle = prev.category.replace(/-/g, ' ');
    var nextTitle = next.category.replace(/-/g, ' ');

    $navigation.html(`
      <a class="prev" href="../` + prev.category + `">
        <strong>&#10094</strong>
        <span class="navTitle">` + prevTitle + `</span>
        <span class="defaultTitle hidden">Previous</span>
      </a>
      <a class="next" href="../` + next.category + `">
        <span class="navTitle">` + nextTitle + `</span>
        <span class="defaultTitle hidden">Next</span>
        <strong>&#10095</strong>
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

    //populate the footer
    var $footer = $('#app-footer');

    $footer.html(`
      <div class="footer">
        <div class="link-list">
          <p class="desktop-only">
            View the <a id="github-footer" target="_blank" href="` + githubLink + `">code</a>  on GitHub,
            <a target="_blank" href="https://app.reflect.io/register">create</a>  an account,
            or <a target="_blank" href="https://reflect.io">visit</a>  the Reflect website
          </p>
          <a class="mobile-only" target="_blank" href="https://app.reflect.io/register">Join Reflect</a>
          <a class="mobile-only" target="_blank" href="https://reflect.io">Learn more</a>
        </div>
      </div>
    `);

    //event tracking
    //DATASET DOWNLOADED
    var datasetDownload = document.getElementById('dataset-download');
    analytics.trackLink(datasetDownload, 'Dataset downloaded', {
      example: app.name,
      category: app.category,
      dataset: app.dataset
    });
    //GITHUB VISITED
    var githubFooter = document.getElementById('github-footer');
    analytics.trackLink(githubFooter, 'GitHub visited', {
      example: app.name,
      category: app.category,
      features: app.features,
      location: 'footer'
    });
    var githubHeader = document.getElementById('github-header');
    analytics.trackLink(githubHeader, 'GitHub visited', {
      example: app.name,
      category: app.category,
      features: app.features,
      location: 'header'
    });
  });
})
