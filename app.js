/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'ExtWeather.Application',

    name: 'ExtWeather',

    requires: [
        // This will automatically load all classes in the ExtWeather namespace
        // so that application classes do not need to require each other.
        'ExtWeather.*'
    ],

    // The name of the initial view to create.
    mainView: 'ExtWeather.view.main.Main'
});

Ext.onReady( function () {
    var current = Ext.create('ExtWeather.store.Current');
    current.load();
    Ext.data.StoreManager.register(current);

    var forecast = Ext.create('ExtWeather.store.Forecast');
    //forecast.getProxy().getReader().setGroupRootProperty('list[0].main');
    forecast.load();
    Ext.data.StoreManager.register(forecast);
})
