Ext.define('ExtWeather.store.Forecast.SpecificForecast' , {
    extend: 'Ext.data.Store', 

    model: 'ExtWeather.model.Forecast.SpecificForecast',

    storeId: 'specificForecast',

    proxy: {
        type: 'jsonp',
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=Warsaw&appid=435b757eb1a5a697cbb51992ce5d7962',
        reader: {
            type: 'json',
            rootProperty: 'list[0].main'
        },
        autoLoad: true,
        autoSync: true
    }
});