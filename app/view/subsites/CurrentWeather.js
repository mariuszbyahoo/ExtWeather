Ext.define('ExtWeather.view.subsites.CurrentWeather',{
    extend: 'Ext.panel.Panel',
    xtype: 'current',
    layout: 'hbox',
    items: [
        {
            xtype: 'panel',
            title: 'Main Weather Data',
            width: 600,
            height: 200,
            margin: 20,
            bind: {
                html: '<div id="main">Tu będą dane</div>'
            }
        },
        {
            xtype: 'panel',
            title: 'Visibility, clouds, and wind',
            width: 600,
            height: 200,
            margin: 20,
            bind: {
                html: '<div id="other">Tu będą dane</div>'
            }
        }
    ]
})