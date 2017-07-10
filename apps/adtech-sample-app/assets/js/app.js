// page titles
var titles = {
  'Overview': 'Ad Retargeting || Overview',
  'Facebook': 'Ad Retargeting || Facebook',
  'Instagram': 'Ad Retargeting || Instagram',
  'Twitter': 'Ad Retargeting || Twitter',
  'LinkedIn': 'Ad Retargeting || LinkedIn',
  'General Web': 'Ad Retargeting || Web',
  'Contacts': 'My Contacts',
  'History': 'Spend history'
}

// call to render default view
function renderDefault(ui) {
  // apply custom date range for comparative grid
  ui.withDates(['2017-07-05', '2017-08-05'], ['2017-09-05', '2017-10-05']);

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

// call to switch Reflect views
function render(ui, view) {
  clearFilters(ui);
  updateTitle(view);

  switch(view) {
    case 'Contacts':
        ui.view(document.getElementById('view'), '0ROu0hKqSFCodgZTExaZmA');

        break;
    case 'Overview':
        renderDefault(ui);

        break;
    case 'Facebook':
        var data = {};
        data.value = 'Facebook';

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
      updateTitle('Overview')
      clearFilters(ui);

      ui.view(document.getElementById('view'), 'ut5x8iIiSxqY3d8HZNApiA');
    } else if ($(window).width() >= 768 && startSize < 768) {
      updateTitle('Overview')
      clearFilters(ui);

      ui.view(document.getElementById('view'), 'ufLtfaBpTMaR0JKl3cmNfQ');
    }
    startSize = $(window).width();
  };

  // render the default view
  renderDefault(ui);
});
