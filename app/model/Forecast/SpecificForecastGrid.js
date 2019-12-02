Ext.define('ExtWeather.model.Forecast.SpecificForecast', {
    extend: 'ExtWeather.model.Base',

    alias: 'model.forecast.specificForecast',

    fields: [
        {
            name: 'temp',
            mapping: '[main].temp'
        }, {
            name: 'temp_min',
            mapping: '[main].temp_min'
        }, {
            name: 'temp_max',
            mapping: '[main].temp_max'
        }, {
            name: 'pressure',
            mapping: '[main].pressure'
        }, {
            name: 'sea_level', 
            mapping: '[main].sea_level'
        }, {
            name: 'grnd_level', 
            mapping: '[main].grnd_level'
        }, {
            name: 'humidity', 
            mapping: '[main].humidity'
        }, {
            name: 'temp_kf',
            mappint: '[main].temp_kf'
        }
    ]
});