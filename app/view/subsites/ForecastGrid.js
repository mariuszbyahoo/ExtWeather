Ext.define('ExtWeather.view.subsites.ForecastGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'forecastGrid',
    title: '5 day forecast',
    columns:[
        {
            text: 'DateTime',
            flex: 1
        },
        {
            text: 'Temperature',
            flex: 1
        },
        {
            text: 'Pressure',
            flex: 1
        },
        {
            text: 'Humidity',
            flex: 1
        }
    ]
})