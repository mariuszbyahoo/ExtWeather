Ext.define('ExtWeather.view.subsites.ForecastMainPanel',{
    extend: 'Ext.panel.Panel',
    xtype: 'forecastMainPanel',
    id: 'forecastMainPanel',
    layout: 'accordion',
    titleAlign: 'center',
    title: 'OpenWeatherAPI Forecast',
    textAlign: 'center',
    buttons: [
        {
            text: 'Load',
            handler: 'onForecastSelected'
        }
    ]
})