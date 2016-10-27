requirejs.config({
    baseUrl: '/javascripts',
    paths: {
        jquery: 'libs/jquery-1.11.3.min',
        chart : 'libs/chart',
        text : 'libs/text',
        ejs : 'libs/ejs_production',
        intro : 'libs/intro.js-2.0/minified/intro.min',
        moment : 'libs/moment.min',
        highcharts : 'libs/highcharts/highcharts',
        typeahead : 'libs/jQuery-autoComplete-master/jquery.auto-complete.min'
    },
    shim: {
       ejs: {
         exports: 'ejs'
       },
       intro: {
         exports: 'intro'
       },
       typeahead : {
          deps: [ 'jquery' ],
          exports: 'typeahead'
       },
       highcharts: {
          deps: [ 'jquery' ],
          exports: 'highcharts'
       }
     }
});

requirejs(['main']);