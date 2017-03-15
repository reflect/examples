$(function(){
  $.get( "views/layouts/navbar.html", function(data) {
    $( "#navbar" ).html(data);
  });

  $.get('https://api.github.com/repos/reflect/examples/contents/', function(data) {
    var $list = $('.page-list');

    data.forEach(function(d) {
      if (d.type === 'file' && d.name.match(/\.html$/) && d.name !== 'index.html') {
        $list.append('<li class="col-md-3"><a href="./views/' + d.name +  '">' + d.name.replace(/\.html$/, '') + '</a></li>')
      }
    })
  })
})
