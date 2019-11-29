Ext.define('ExtWeather.view.subsites.CurrentWeather',{
    extend: 'Ext.panel.Panel',
    xtype: 'current',
    layout: 'hbox',
    viewModel: 'main',

    buttons: [
        {
            text: 'Reload data',
            handler: 'onCurrentSelected'
        }
    ],

    items: [
        {
            xtype: 'panel',
            title: 'Basic weather info',
            id: 'currentGrid',
            viewModel: 'main',
            width: 600,
            height: 200,
            margin: 20,
            items: [
                {
                    xtype: 'panel',
                    id: 'currentContent',
                    width: 400,
                    height: 200,
                    margin: 20,
                    bind: {
                        html : '{startInfo}'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            title: 'Visibility, clouds, and wind',
            id: 'forecastGrid',
            viewModel: 'main',
            width: 600,
            height: 200,
            margin: 20,
            items: [
                {
                    xtype: 'panel',
                    id: 'forecastContent',
                    width: 400,
                    height: 200,
                    margin: 20,
                    bind: {
                        html : '{startInfo}'
                    }
                }
            ]
        }
    ]
})