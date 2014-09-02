$(function () {

    var options = {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Volvo XC60 search results'
        },
        subtitle: {
            text: 'T5s and D5s below 80,000km and $40,000'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Odometer (km)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Price ($)'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{point.key}</b><br>',
                    pointFormat: '{point.x}km, ${point.y}',
                    shared: true
                }
            }
        },
        series: []
    };

    $.getJSON("/carsales", function(carsalesData) {
      options['series'] = [{
        name: "T5",
        color: 'rgba(223, 83, 83, .5)',
        data: carsalesData['T5']
      },{
        name: "D5",
        color: 'rgba(119, 152, 191, .5)',
        data: carsalesData['D5']
      }]
      $('#container').highcharts(options);
    });

});

