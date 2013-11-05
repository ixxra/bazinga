var jsdom = require('jsdom').jsdom, 
    fs = require('fs'),
    jquery = fs.readFileSync('./lib/jquery.js', 'utf-8');

var Article = require('../models/article.js').Article;

//var MAGAZINE = 'http://intranet.matematicas.uady.mx/journal/index.php';
//
//var parsers = {
//    title: function (line) {
//        var pos = line.indexOf('[Pag');
//        return line.slice(0, pos).trim();
//    },
//
//    art_type: function (line) {
//        var pos = line.indexOf(':');
//        return line.slice(pos + 1).trim();
//    },
//
//    category: function (line) {
//        var pos = line.indexOf(':');
//        return line.slice(pos + 1).trim();
//    },
//
//    authors: function (line) {
//        var pos = line.indexOf(':');
//        var data = line.slice(pos + 1).split(',');
//        return data.map(function (author) {return author.trim()});
//    }
//};

//function show_magazine(errors, window){
//  var magazine = {data: [], total: 0};
//  var total = 1;
//  window.$('.publicacion').each(function(){
//      window.$('tr', this).each(function () {
//          magazine.data.push({
//            title:  parsers.title(window.$('.titulo', this).text()),
//            art_type: parsers.art_type(window.$('.tipoArticulo', this).text()),
//            category:  parsers.category(window.$('.categoria', this).text()),
//            authors:  parsers.authors(window.$('.autor', this).text()),
//            abstract:  window.$('.abstract', this).text(),
//            url:  window.$('.enlaces a', this)[0].href
//          });
//        ++total;
//      });
//    });
//  magazine.total = total;
//  return magazine;
//};


/*
 * GET articles list
 */

//exports.magazine = function(req, res){
//    jsdom.env({
//        url: MAGAZINE,
//        src: [jquery],
//        done: function (errors, window) {
//            if (errors) {
//                console.log('Resourse not available');
//            } else {
//                magazine = show_magazine(errors, window);
//               res.send(magazine);    
//            }
//            //res.render ... uses 'magazine' view
//            //and binds magazine object
//            //res.render('magazine', magazine);
//        }
//    });
//};



exports.magazine = function (req, res) {
    Article.find({}, function (err, articles){
        if (err) throw err;
        
        res.send({data: articles, total: articles.length});
    });  
};