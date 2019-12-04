Ext.define('ExtWeather.model.Forecast.SpecificForecastGrid', {
    extend: 'ExtWeather.model.Base',

    alias: 'model.forecast.specificForecastGrid',

    fields: [
        {
            name: 'temp',
            mapping: 'main.temp',
        }, {
            name: 'temp_min',
            mapping: 'main.temp_min',
        }, {
            name: 'temp_min_c',
            mapping: 'main.temp_min',
            convert: function(kelvin){
                return''+((Math.round(kelvin - 273.15) * 100) / 100) + ' &#8451';
            }
        }, {
            name: 'temp_max',
            mapping: 'main.temp_max',
        }, {
            name: 'temp_max_c',
            mapping: 'main.temp_max',
            convert: function(kelvin){
                return ''+((Math.round(kelvin - 273.15) * 100) / 100) + '  &#8451';
            }
        }, {
            name: 'pressure',
            mapping: 'main.pressure'
        }, {
            name: 'sea_level', 
            mapping: 'main.sea_level'
        }, {
            name: 'grnd_level', 
            mapping: 'main.grnd_level'
        }, {
            name: 'humidity', 
            mapping: 'main.humidity'
        }, {
            name: 'temp_kf',
            mapping: 'main.temp_kf'
        }, {
            name: 'dt_txt',
            mapping: 'dt_txt',
            type: 'date' // ExtJs automatically converts strings to date if this line specified
        }, {
            name: 'wind_deg',
            mapping: 'wind.deg',
            convert: function(deg){ // a może by tak zrobić tu kompas i by przeszło jakoś bez problemu?
                if(deg > 345 || deg <= 15)  {return 'North'}
                else if(deg > 145 || deg <= 75)  {return 'North - East'}
                else if(deg > 75 || deg <= 105)  {return 'East'}
                else if(deg > 105 || deg <= 165) {return 'South - East'}
                else if(deg > 165 || deg <= 195) {return 'South'}
                else if(deg > 195 || deg <= 255) {return 'South - West'}
                else if(deg > 255 || deg <= 285) {return 'West'}
                else if(deg > 285 || deg <= 345) {return 'North - West'}
                else{ return 'Undefined'}
            }
        }, {
            name: 'wind_speed',
            mapping: 'wind.speed'
        }, {
            name: 'description',
            mapping: 'weather[0].description'
        }
    ],
    proxy: {
        type: 'jsonp',
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=Warsaw&appid=435b757eb1a5a697cbb51992ce5d7962',
        reader: {
            type: 'json',
            rootProperty: 'list' 
        },
        autoLoad: true,
        autoSync: true
    }
});