Ext.define('ExtWeather.view.subsites.ForecastGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'forecastGrid',
    title: '5 day forecast',
    columns:[
        {
            text: 'Temperature',
        },
        {
            text: 'DateTime'
        },
        {
            text: 'Pressure'
        },
        {
            text: 'Humidity'
        }
    ]
})