var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

  var url = "http://www.carsales.com.au/all-cars/results.aspx?silo=stock&q=(((((((((SiloType%3d%5bBrand+new+cars+in+stock%5d%7cSiloType%3d%5bBrand+new+cars+available%5d)%7cSiloType%3d%5bDemo+and+near+new+cars%5d)%7cSiloType%3d%5bDealer+used+cars%5d)%7cSiloType%3d%5bDemo+and+near+new+cars%5d)%7cSiloType%3d%5bPrivate+seller+cars%5d)%26((((Make%7b%3d%7d%5bVolvo%5d%7b%26%7d(Model%7b%3d%7d%5bXC60%5d%7b%26%7dBadge%7b%3d%7d%5bT5%5d))%7b%7c%7d(Make%7b%3d%7d%5bVolvo%5d%7b%26%7d(Model%7b%3d%7d%5bXC60%5d%7b%26%7dBadge%7b%3d%7d%5bT5+Teknik%5d)))%7b%7c%7d(Make%7b%3d%7d%5bVolvo%5d%7b%26%7d(Model%7b%3d%7d%5bXC60%5d%7b%26%7dBadge%7b%3d%7d%5bD5%5d)))%7b%7c%7d(Make%7b%3d%7d%5bVolvo%5d%7b%26%7d(Model%7b%3d%7d%5bXC60%5d%7b%26%7dBadge%7b%3d%7d%5bD5+LE%5d))))%26Service%3d%5bCarsales%5d)%26Price%3drange%5b0..37000%5d))%26(Odometer%3drange%5b..100000%5d)&vertical=car&sortby=TopDeal&limit=150";
  var json

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var results = $(".result-item").map(function() {
          return { 
            "name": $(this).find("h2 a").text(),
            "link": $(this).find("h2 a").attr("href"),
            "odometer": parseInt($(this).find(".item-odometer").text().split(" ")[0].trim().split(',').join('')),
            "x": parseInt($(this).find(".item-odometer").text().split(" ")[0].trim().split(',').join('')),
            "engine": $(this).find(".item-engine").text().trim(),
            "price": parseInt($(this).find(".primary-price a").attr("data-price")),
            "y": parseInt($(this).find(".primary-price a").attr("data-price"))
          }
        })

      res.json({
        "T5": results.filter(function() { return this.engine == "4cyl 2.0L" }).get(),
        "D5": results.filter(function() { return this.engine != "4cyl 2.0L" }).get()
      });

    }
  })

});

module.exports = router;
