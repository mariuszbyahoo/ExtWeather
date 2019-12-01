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

// Automatically ExtJs couldn't register my stores so I simplified it and I'm creating several stores
Ext.onReady( function () {
    // Current Weather Stores:
    var current = Ext.create('ExtWeather.store.Current.Current');
    current.load();
    Ext.data.StoreManager.register(current);

    let wind = Ext.create('ExtWeather.store.Current.Wind');
    wind.load();
    Ext.data.StoreManager.register(wind);

    let clouds = Ext.create('ExtWeather.store.Current.Clouds');
    clouds.load();
    Ext.data.StoreManager.register(clouds);

    let rootInfo = Ext.create('ExtWeather.store.Current.RootInfo');
    rootInfo.load();
    Ext.data.StoreManager.register(rootInfo);

    // Forecast Stores: 
    let forecastCounter = Ext.create('ExtWeather.store.Forecast.ForecastCounter');
    forecastCounter.load();
    Ext.data.StoreManager.register(forecastCounter);

    let specificForecast = Ext.create('ExtWeather.store.Forecast.SpecificForecast');
    specificForecast.load();
    Ext.data.StoreManager.register(specificForecast);
})
