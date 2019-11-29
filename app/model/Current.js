Ext.define('ExtWeather.model.Current', {
    extend: 'ExtWeather.model.Base',

    alias: 'model.current',

    fields: [
        'temp', 'pressure', 'humidity', 'temp_max', 'temp_min'
    ]
});