// call to render default view
function renderDefault(ui) {
  if ($(window).width() < 750) {
    ui.view(document.getElementById('view'), 'cP4YDx39QcyOgGTmhJQiAA');
  } else {
    ui.view(document.getElementById('view'), 'gf3vzhAJRy23C_4Fxg6ayg');
  }
}

// call to switch Reflect views
function render(ui, view) {
  switch(view) {
    case 'Sales':
        renderDefault(ui);

        break;
    case 'Inventory':
        ui.view(document.getElementById('view'), 'ohcofAiwRdyNMMaJDwb6ag');

        break;
    case 'Invoices':
        ui.view(document.getElementById('view'), 'WC51OmKZQE-lN9RVik0U0Q');

        break;
    default:
        renderDefault(ui);
  }
};

// call to filter by customer type
function filterByCustomer(ui, tags) {
  var customer = {
    field: 'Customer Segment',
    op: '=',
    any: tags,
    removable: true
  }

  ui.withFilters([customer]);
}

// call to update active nav item
function updateNav(item) {
  $('a.navigation').removeClass('active');
  $('a.navigation[name=' + item + ']').addClass('active');
}

$(function() {
  //instantiate new instance
  var ui = new ReflectUI();

  // swap views with navigation
  $('a.navigation').click(function(e) {
    var page = e.target.name;

    updateNav(page)
    render(ui, page);
  });

  // toggle date range
  var oneMonth = moment().subtract(1,'month').format('YYYY-MM-DD');
  var oneWeek = moment().subtract(7,'d').format('YYYY-MM-DD');
  var today = moment().format('YYYY-MM-DD');
  var monthly = true;

  $('#dates-toggle').click(function() {
    var page = $('a.navigation.active').attr('name');
    monthly = !monthly;

    if (monthly) {
      ui.withDates([oneMonth, today]);
    } else {
      ui.withDates([oneWeek, today]);
    }

    render(ui, page);
  });


  $('.date-toggle').click(function() {
    $('#dates-toggle').click();
  });

  // toggle customer type
  var business = true;

  $('#types-toggle').click(function() {
    var page = $('a.navigation.active').attr('name');
    business = !business;

    if (business) {
      filterByCustomer(ui, ['Corporate', 'Small Business']);
    } else {
      filterByCustomer(ui, ['Consumer', 'Home Office']);
    }

    render(ui, page);
  });

  $('.type-toggle').click(function() {
    $('#types-toggle').click();
  });

  // swap view when resizing
  var startSize = $(window).width();
  window.onresize = function(event) {
    if ($(window).width() < 768 && startSize >= 768) {
      updateNav('Sales');

      ui.view(document.getElementById('view'), 'cP4YDx39QcyOgGTmhJQiAA');
    } else if ($(window).width() >= 768 && startSize < 768) {
      updateNav('Sales');

      ui.view(document.getElementById('view'), 'gf3vzhAJRy23C_4Fxg6ayg');
    }

    startSize = $(window).width();
  };

  // set starting customer type
  filterByCustomer(ui, ['Corporate', 'Small Business']);

  // render the default view
  renderDefault(ui);
});
