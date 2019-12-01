Ext.define('ExtWeather.model.Current.CurrentBasicData', {
    extend: 'ExtWeather.model.Base',

    alias: 'model.current.currentBasicData',

    fields: [
        'temp', 'pressure', 'humidity', 'temp_max', 'temp_min'
    ]
});