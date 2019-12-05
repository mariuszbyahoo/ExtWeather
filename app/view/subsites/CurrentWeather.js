Ext.define('ExtWeather.view.subsites.CurrentWeather',{
    extend: 'Ext.panel.Panel',
    xtype: 'current',
    layout: 'hbox',
    viewModel: 'main',
    id: 'currentRootPanel',
    title: 'Check the current weather',
    titleAlign: 'center',

    buttons: [
        {
            text: 'Load',
            handler: 'logCsv'
        }
    ],

    items: [
        {
            xtype: 'panel',
            title: 'Basic weather info',
            id: 'currentGrid',
            viewModel: 'main',
            titleAlign: 'center',
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
            id: 'othersGrid',
            viewModel: 'main',
            titleAlign: 'center',
            width: 600,
            height: 250,
            margin: 20,
            items: [
                {
                    xtype: 'panel',
                    id: 'windContent',
                    width: 400,
                    height: 60,
                    margin: 10,
                    bind: {
                        html : '{startInfo}'
                    }
                },
                {
                    xtype: 'panel',
                    id: 'cloudsContent',
                    width: 400,
                    height: 30,
                    margin: 10,
                    bind: {
                        html: ''
                    }
                },
                {
                    xtype: 'panel',
                    id: 'visibilityContent',
                    width: 400,
                    height: 30,
                    margin: 10,
                }
            ]
        }
    ]
})