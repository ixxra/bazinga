var jsdom = require('jsdom').jsdom, 
    fs = require('fs');
    
var jquery = fs.readFileSync('./lib/jquery.js', 'utf-8');
//var jsdom = require('jsdom').jsdom
//      , myWindow = jsdom().createWindow()
//      , $ = require('jquery').create()
//      , jQuery = require('jquery').create(myWindow)
//      ;

var magazine = 'http://intranet.matematicas.uady.mx/journal/index.php';

function show_magazine(errors, window){
  var magazine = {data: [], total: 0};
  var total = 1;
  window.$('.publicacion').each(function(){
      window.$('tr', this).each(function () {
          magazine.data.push({
            titulo:  window.$('.titulo', this).text(),
            tipoArt: window.$('.tipoArticulo', this).text(),
            cat:  window.$('.categoria', this).text(),
            autor:  window.$('.autor', this).text(),
            abs:  window.$('.abstract', this).text(),
            origin:  window.$('.enlaces a')[0].href
        //console.log(titulo, tipoArt, cat, autor, origin);
          });
        ++total;
      });
    });
  magazine.total = total;
  console.log(JSON.stringify(magazine));
};

jsdom.env({
    url: magazine,
    src: [jquery],
    done: show_magazine
});


//    $("<h1>test passes</h1>").appendTo("body");
//    console.log($("body").html());
//
//    jQuery("<h3>second test passes</h3>").appendTo("body");
//    console.log(jQuery("body").html());
//
//jsdom.env(
//  "http://nodejs.org/dist/",
//  ["http://code.jquery.com/jquery.js"],
//  function (errors, window) {
//    console.log("there have been", window.$("a").length, "nodejs releases!");
//  }
//);
