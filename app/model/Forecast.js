Ext.define('ExtWeather.model.Forecast', {
    extend: 'ExtWeather.model.Base',

    alias: 'model.forecast',

    fields: [
        'temp', 'temp_min', 'temp_max', 'pressure', 'sea_level', 'grnd_level', 'humidity', 'temp_kf'
    ]
});
/*temp: 278.01,
temp_min: 277.35,
temp_max: 278.01,
pressure: 1002,
sea_level: 1002,
grnd_level: 987,
humidity: 70, */