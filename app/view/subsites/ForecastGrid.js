Ext.define('ExtWeather.view.subsites.ForecastGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'forecastGrid',
    title: '5 day forecast',
    columns:[
        {
            text: 'DateTime',
            flex: 1,
            dataIndex: 'dt_txt'
        },
        {
            text: 'Temperature',
            flex: 1,
            dataIndex: 'temp'
        },
        {
            text: 'Pressure',
            flex: 1,
            dataIndex: 'pressure'
        },
        {
            text: 'Humidity',
            flex: 1,
            dataIndex: 'humidity'
        }
    ]
})