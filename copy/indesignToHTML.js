'use strict';
var fs = require('fs'),
cheerio = require('cheerio');

var sourceFile = 'copy/source.html',
    cleanFile = 'copy/clean.html',
    fileName,
    elementName,
    $;

var idList = {
  'index': '003',
  'pricing': '005',
  'pricing-sidebar': '004',
  'about-sidebar':'006',
  'about':'008'
};

var cruft = [
  'none',
  'Basic-Text-Frame',
  'Basic-Table',
  'h1',
  'h2',
  'h3',
  'ol'
];

function splitFile($){
  /*jshint loopfunc: true */

  for(var key in idList){
    fileName = 'copy/fragments/' + key + '.html';
    elementName = '#_idContainer'+ idList[key];
    fs.writeFile(fileName, $(elementName).contents(), function(err) {
      if(err) {
        return console.log(err);
      }
    });
  }
}

function decruft($) {
  cruft.forEach(function (element){
    $('.' + element).removeClass(element);
  });
  $('*[class=""]').removeAttr('class');
}

function processFile(content) {
  $ = cheerio.load(content);

  decruft($);
  splitFile($);
  fs.writeFile(cleanFile, $.html(), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log('Clean version of the file was saved.');
  });
}

fs.readFile(sourceFile, function read(err, data) {
  if (err) {
    throw err;
  }
  processFile(data.toString('utf8'));
});
