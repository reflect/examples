"use strict";$(function(){$.get("./src/json/examples.json",function(e){var n=$(".card-list");e.forEach(function(e){var s=e.category.replace(/-/g," "),a=[];e.features.forEach(function(e){var n=e.split(" ").join("_");a.push('<p class="feature '+n+'">'+e+"</p>")}),a=a.sort().join(""),n.append('\n        <div class="card-wrapper">\n          <div class="card">\n            <a href="/'+e.category+'">\n              <div class="image-wrapper">\n                <img src="'+e.category+"/"+e.name+'.png" />\n              </div>\n              <div class="content">\n                <h3 class="title">'+s+'</h3>\n                <p class="description">'+e.description+'</p>\n              </div>\n            </a>\n            <div class="features">\n              '+a+"\n            </div>\n          </div>\n        </div>\n      ")}),Object.keys(e).length<3||(Object.keys(e).length%2==1?n.append('<div class="card-filler desktop-only"></div>'):Object.keys(e).length%2==0&&n.append('<div class="card-filler desktop-only"></div><div class="card-filler desktop-only"></div>')),$(".card").mouseenter(function(){$(".card").not(this).addClass("inactive"),$(this).removeClass("inactive")}),$(".card-container").mouseleave(function(){$(".card").not(this).removeClass("inactive")})})});