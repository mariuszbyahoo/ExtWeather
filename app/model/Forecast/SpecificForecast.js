Ext.define('ExtWeather.model.Forecast.SpecificForecast', {
    extend: 'ExtWeather.model.Base',

    alias: 'model.forecast.specificForecast',

    fields: [
        'temp', 'temp_min', 'temp_max', 'pressure', 'sea_level', 'grnd_level', 'humidity', 'temp_kf'
    ]
});