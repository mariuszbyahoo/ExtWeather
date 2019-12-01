Ext.define('ExtWeather.view.subsites.ForecastMainPanel',{
    extend: 'Ext.panel.Panel',
    xtype: 'forecastMainPanel',
    id: 'forecastMainPanel',
    layout: 'accordion',
    buttons: [
        {
            text: 'Load',
            handler: 'onForecastSelected'
        }
    ]
})