Ext.define('ExtWeather.model.Forecast.SpecificForecastGridDesc', {
    extend: 'ExtWeather.model.Base',

    alias: 'model.forecast.specificForecastGridDesc',

    fields: [
        {
            name: 'desc',
            mapping: 'weather[0].description'
        }, {
            name: 'wind_speed',
            mapping: 'wind.speed'
        }, {
            name: 'wind_deg',
            mapping: 'wind.deg'
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