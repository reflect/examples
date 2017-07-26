// page titles
var titles = {
  'Summary': 'Ad Retargeting | <b>Summary</b>',
  'Facebook': 'Ad Retargeting | <b>Facebook</b>',
  'Instagram': 'Ad Retargeting | <b>Instagram</b>',
  'Twitter': 'Ad Retargeting | <b>Twitter</b>',
  'LinkedIn': 'Ad Retargeting | <b>LinkedIn</b>',
  'General Web': 'Ad Retargeting | <b>Web</b>',
  'Contacts': 'My Network Contacts',
  'History': 'Campaign History'
}

// call to render default view
function renderDefault(ui) {

  // account for screen size
  if ($(window).width() < 750) {
    ui.view(document.getElementById('view'), 'ut5x8iIiSxqY3d8HZNApiA');
  } else {
    ui.view(document.getElementById('view'), 'ufLtfaBpTMaR0JKl3cmNfQ');
  }
}

// call to filter by platform
function filterByPlatform(ui, tag) {
  var platform = {
    field: 'Social Platform',
    op: '=',
    value: tag,
    removable: true
  }

  ui.withFilters([platform]);
}

// call to remove existing filters
function clearFilters(ui) {
  ui.withFilters({});
}

// call to drill-into data points and legend items
function drillIntoDataPoint(ui, data) {
  var platform;

  if ('rowData' in data) {
    platform = data.rowData['Social Platform'];
  } else {
    platform = data.value;
  }

  updateTitle(platform);
  filterByPlatform(ui, platform);
  ui.view(document.getElementById('view'), 'IpBoOweIRKS2swPlGJ57Kw');
}

// call to update page title
function updateTitle(page) {
  $('#page-title').html(titles[page]);
}

// call to update active nav item
function updateNav(item) {
  $('button.navigation').removeClass('active');
  $('button.navigation[name=' + item + ']').addClass('active');
}

// call to switch Reflect views
function render(ui, view) {
  clearFilters(ui);
  updateTitle(view);
  updateNav(view);

  switch(view) {
    case 'Contacts':
        ui.view(document.getElementById('view'), '0ROu0hKqSFCodgZTExaZmA');

        break;
    case 'Summary':
        renderDefault(ui);

        break;
    case 'Facebook':
    case 'Twitter':
        var data = {};
        data.value = view;

        drillIntoDataPoint(ui, data);

        break;
    case 'History':
        ui.view(document.getElementById('view'), 'XQgyVfUVSWO13NR6w-v3_A');

        break;
    default:
        renderDefault(ui);
  }
};

$(function() {
  // instantiate new instance
  var ui = new ReflectUI();

  // swap views with navigation
  $('button.navigation').click(function(e) {
    var page = e.target.name;

    render(ui, page);
  });

  // swap views when clicking a data point or legend item
  ui.on('impressions', 'dataPointClick', function(data) {
    drillIntoDataPoint(ui, data)
  });
  ui.on('spend', 'dataPointClick', function(data) {
    drillIntoDataPoint(ui, data)
  });
  ui.on('conversions', 'dataPointClick', function(data) {
    drillIntoDataPoint(ui, data)
  });
  ui.on('impressions', 'legendItemClick', function(data) {
    drillIntoDataPoint(ui, data)
  });

  // swap view when resizing
  var startSize = $(window).width();

  window.onresize = function(event) {
    if ($(window).width() < 768 && startSize >= 768) {
      updateTitle('Summary');
      clearFilters(ui);

      ui.view(document.getElementById('view'), 'ut5x8iIiSxqY3d8HZNApiA');
    } else if ($(window).width() >= 768 && startSize < 768) {
      updateTitle('Summary');
      updateNav('Summary');
      clearFilters(ui);

      ui.view(document.getElementById('view'), 'ufLtfaBpTMaR0JKl3cmNfQ');
    }
    startSize = $(window).width();
  };

  // render the default view
  renderDefault(ui);
});
