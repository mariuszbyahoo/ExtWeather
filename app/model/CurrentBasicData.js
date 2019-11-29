Ext.define('ExtWeather.model.CurrentBasicData', {
    extend: 'ExtWeather.model.Base',

    alias: 'model.currentBasicData',

    fields: [
        'temp', 'pressure', 'humidity', 'temp_max', 'temp_min'
    ]
});