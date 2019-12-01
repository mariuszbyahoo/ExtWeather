Ext.define('ExtWeather.store.Current.RootInfo' , {
    extend: 'Ext.data.Store', 

    model: 'ExtWeather.model.Current.CurrentRootInfo',

    storeId: 'rootInfo',

    proxy: {
        type: 'jsonp',
        url: 'https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=435b757eb1a5a697cbb51992ce5d7962',
        reader: {
            type: 'json',
        },
        autoLoad: true,
        autoSync: true
    }
});