Ext.define('ExtWeather.store.Forecast' , {
    extend: 'Ext.data.Store', 

    alias: 'store.forecast',

    model: 'ExtWeather.model.Forecast',

    storeId: 'forecast',

    id: 'forecast',

    reference: 'forecast',

    proxy: {
        type: 'jsonp',
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=Warsaw&appid=435b757eb1a5a697cbb51992ce5d7962',
        reader: {
            type: 'json',
            rootProperty: 'list[8].main'
        },
        autoLoad: true,
        autoSync: true
    }
});