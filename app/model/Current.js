Ext.define('ExtWeather.model.Current', {
    extend: 'ExtWeather.model.Base',

    fields: [
        'description', 'temp', 'pressure', 'humidity'
    ],

    // proxy: {
    //     type: 'jsonp',
    //     url: 'https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=435b757eb1a5a697cbb51992ce5d7962',
    // }
});
