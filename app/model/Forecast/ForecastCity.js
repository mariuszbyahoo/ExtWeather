Ext.define('ExtWeather.model.Forecast.ForecastCity', {
    extend: 'ExtWeather.model.Base',

    alias: 'model.forecast.forecastCity',

    fields: [
        'id', 'name', 'country', 'population', 'timezone', 'sunrise', 'sunset'
    ]
});