Ext.define('ExtWeather.model.Current', {
    extend: 'ExtWeather.model.Base',

    fields: [
        'coord', 'weather', 'main', 'visibility', 'wind', 'clouds'
    ]
});
