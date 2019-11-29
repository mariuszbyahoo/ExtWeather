Ext.define('ExtWeather.model.Forecast', {
    extend: 'ExtWeather.model.Base',

    alias: 'model.forecast',

    fields: [
        'temp', 'temp_min', 'temp_max', 'pressure', 'sea_level', 'grnd_level', 'humidity', 'temp_kf'
    ]
});
