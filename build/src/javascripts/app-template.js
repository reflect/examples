"use strict";var featureUrls={custom_colors:"https://reflect.io/docs/platform/embedding#Customcolors",filters:"https://reflect.io/docs/platform/embedding#Filters",parameters:"https://reflect.io/docs/platform/authentication#Parameterizedviews",formatters:"https://reflect.io/docs/platform/embedding#Formatters",interactions:"https://reflect.io/docs/platform/embedding#Interactions",custom_controls:"https://reflect.io/docs/platform/embedding#CustomizingyourReflectviews",custom_components:"https://reflect.io/docs/platform/embedding#Customcomponenttypes",dates:"https://reflect.io/docs/platform/embedding#Dateranges"};$(function(){var t=window.location.pathname.match("/(.*?)/")[1];$.get("../../src/json/examples.json",function(e){function a(){$(window).width()<=799?($(".defaultTitle").removeClass("hidden"),$(".navTitle").addClass("hidden")):($(".defaultTitle").addClass("hidden"),$(".navTitle").removeClass("hidden"))}var s,n=e.find(function(e,a){return s=a,e.category===t}),o=s>0?e[s-1]:e[e.length-1],r=e.length>s+1?e[s+1]:e[0],l=n.category.replace(/-/g," ");l=l.substr(0,1).toUpperCase()+l.substr(1),$("#app-title").text("Reflect / "+l);var i=[];n.features.forEach(function(t){var e=t.split(" ").join("_"),a=featureUrls[e];i.push('<a target="_blank" class="feature '+e+'" href="'+a+'">'+t+"</a>")}),i=i.sort().join("");var c,d=n.dataset;c="default"===d?"<p>Default sample connection</p>":'<a href="https://cdn.reflect.io/datasets/'+d+'">'+d+"</a>",$("#app-instruction").html('\n      <small class="instruction"><strong>1</strong> '+n.mainGoal+'</small><br>\n      <hr><small class="instruction"><strong>2</strong> '+n.secondaryGoal+"</small>\n    "),$("#app-header").append('\n      <a target="_blank" class="fork-me desktop-only" href="https://github.com/reflect/examples/blob/master/apps/'+n.category+"/"+n.name+'.html">\n        <img src="https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png">\n      </a>\n      <div class="lead">\n        <h1 class="title">'+l+"</h1>\n        <h2>"+n.description+'</h2>\n      </div>\n      <div class="resources desktop-only">\n        <div class="features">\n          <h6>Features</h6>\n          '+i+'\n        </div>\n        <div class="dataset">\n          <h6>Dataset</h6>\n          '+c+"\n        </div>\n      </div>\n    ");var f=$("#app-navigation"),p=o.category.replace(/-/g," "),h=r.category.replace(/-/g," ");f.html('\n      <a class="prev" href="/'+o.category+'">\n        <strong>&#10094</strong>\n        <span class="navTitle">'+p+'</span>\n        <span class="defaultTitle hidden">Previous</span>\n      </a>\n      <a class="next" href="/'+r.category+'">\n        <span class="navTitle">'+h+'</span>\n        <span class="defaultTitle hidden">Next</span>\n        <strong>&#10095</strong>\n      </a>\n    '),a(),$(window).on("resize",function(){a()}),$("#app-footer").html('\n      <div class="footer">\n        <div class="link-list">\n          <a target="_blank" href="https://app.reflect.io/register">Join Reflect</a>\n          <a target="_blank" href="https://reflect.io/tour">Learn more</a>\n          <a class="desktop-only" target="_blank" href="https://twitter.com/reflecthq">Follow us</a>\n        </div>\n      </div>\n    ')})});