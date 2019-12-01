Ext.define('ExtWeather.store.Clouds' , {
    extend: 'Ext.data.Store', 

    model: 'ExtWeather.model.Current.CurrentCloudsData',

    storeId: 'clouds',

    proxy: {
        type: 'jsonp',
        url: 'https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=435b757eb1a5a697cbb51992ce5d7962',
        reader: {
            type: 'json',
            rootProperty: 'weather',
        },
        autoLoad: true,
        autoSync: true
    }
});