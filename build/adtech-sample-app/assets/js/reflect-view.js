//call to render the main view (account for screen size)
function render(ui) {
  //apply custom date range for comparative grid
  ui.withDates(['2017-07-05', '2017-08-05'], ['2017-09-05', '2017-10-05'])

  if ($(window).width() < 750) {
    ui.view(document.getElementById('view'), 'ut5x8iIiSxqY3d8HZNApiA');
  } else {
    ui.view(document.getElementById('view'), 'ufLtfaBpTMaR0JKl3cmNfQ');
  }
}

//call to filter by platform
function filterByPlatform(ui, tag) {
  var platform = {
    field: 'Social Platform',
    op: '=',
    value: tag,
    removable: true
  }

  ui.withFilters([platform]);
}

//call to drill-into data points and legend items
function drillIntoDataPoint(ui, data) {
  var platform;

  if ('rowData' in data) {
    platform = data.rowData['Social Platform'];
  } else {
    platform = data.value;
  }

  filterByPlatform(ui, platform);
  ui.view(document.getElementById('view'), 'IpBoOweIRKS2swPlGJ57Kw');
}

$(function() {
  //instantiate new instance
  var ui = new ReflectUI();

  //swap view when clicking a data point or legend item
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

  //swap view when resizing
  var startSize = $(window).width();

  window.onresize = function(event) {
    if ($(window).width() < 750 && startSize >= 750) {
      //remove any existing filters
      ui.withFilters({});

      ui.view(document.getElementById('view'), 'ut5x8iIiSxqY3d8HZNApiA');
    } else if ($(window).width() >= 750 && startSize < 750) {
      //remove any existing filters
      ui.withFilters({});

      ui.view(document.getElementById('view'), 'ufLtfaBpTMaR0JKl3cmNfQ');
    }
    startSize = $(window).width();
  };

  //render the view
  render(ui);
});
