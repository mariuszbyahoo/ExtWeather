Ext.define('ExtWeather.store.Current.Wind' , {
    extend: 'Ext.data.Store', 

    model: 'ExtWeather.model.Current.CurrentWindData',

    storeId: 'wind',

    proxy: {
        type: 'jsonp',
        url: 'https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=435b757eb1a5a697cbb51992ce5d7962',
        reader: {
            type: 'json',
            rootProperty: 'wind',
        },
        autoLoad: true,
        autoSync: true
    }
});