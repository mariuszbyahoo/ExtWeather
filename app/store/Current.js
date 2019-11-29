Ext.define('ExtWeather.store.Current' , {
    extend: 'Ext.data.Store', 

    alias: 'store.current',

    model: 'ExtWeather.model.Current',

    storeId: 'current',

    id: 'current',

    reference: 'current',

    proxy: {
        type: 'jsonp',
        url: '',
        reader: {
            type: 'json',
            rootProperty: 'main',
        },
    }
});