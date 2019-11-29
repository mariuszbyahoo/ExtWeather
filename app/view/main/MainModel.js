/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('ExtWeather.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    store: {
        type: 'current'
    },

    data: {
        query: '',

        name: 'ExtWeather',

        startInfo: 'Fill in the form or press Load Data below to see some info',

        homeText: '<h2>Ext Weather App</h2> <br /> <p>App is gathering the data from an open source API called OpenWeather API.</p>',

        openWeatherLogo: '<img src="./resources/openweather-transparent-logo-RGB.png"></img>',
    }

    //TODO - add data, formulas and/or methods to support your view
});
