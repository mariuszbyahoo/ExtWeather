/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('ExtWeather.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    id: 'mainViewModel',

    store: {
        type: 'current'
    },

    data: {
        query: '',

        name: 'ExtWeather',

        areForecastsPopulated: 'false',

        headerWasSet: false,

        voivodeshipCapitals: 'Warsaw,Poznań,Kraków,Łódź,Gdańsk,Rzeszów,Suwałki,Szczecin,Toruń',

        weatherLog: '',

        startInfo: 'Fill in the form or press Load Data below to see some info',

        homeText: '<h2>Ext Weather App</h2> <br /> <p>App is gathering the data from the OpenWeather API.</p>',

        openWeatherLogo: '<img src="./resources/openweather-transparent-logo-RGB.png"></img>',

        weatherBanner: '<img src="./resources/banner.jpg" ></img>'
    }
});
