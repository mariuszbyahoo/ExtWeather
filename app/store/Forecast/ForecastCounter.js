Ext.define('ExtWeather.store.Forecast.ForecastCounter' , {
    extend: 'Ext.data.Store', 

    model: 'ExtWeather.model.Forecast.ForecastCounter',

    storeId: 'forecastCounter',

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