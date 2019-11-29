/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'ExtWeather.Application',

    name: 'ExtWeather',

    requires: [

        'ExtWeather.*'
    ],

    mainView: 'ExtWeather.view.main.Main'
});

Ext.onReady( function () {
    var current = Ext.create('ExtWeather.store.Current');
    current.load();
    Ext.data.StoreManager.register(current);

    var forecast = Ext.create('ExtWeather.store.Forecast');
    forecast.load();
    Ext.data.StoreManager.register(forecast);
})
