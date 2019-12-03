Ext.define('ExtWeather.model.Forecast.SpecificForecastGrid', {
    extend: 'ExtWeather.model.Base',

    alias: 'model.forecast.specificForecastGrid',

    fields: [
        {
            name: 'temp',
            mapping: 'main.temp'
        }, {
            name: 'temp_min',
            mapping: 'main.temp_min'
        }, {
            name: 'temp_max',
            mapping: 'main.temp_max'
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
            mappint: 'main.temp_kf'
        }, {
            name: 'dt_txt',
            mapping: 'dt_txt',
            type: 'date' // ExtJs automatically converts strings to date if this line specified
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