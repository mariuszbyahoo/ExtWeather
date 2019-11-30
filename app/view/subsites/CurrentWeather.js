Ext.define('ExtWeather.view.subsites.CurrentWeather',{
    extend: 'Ext.panel.Panel',
    xtype: 'current',
    layout: 'hbox',
    viewModel: 'main',

    buttons: [
        {
            text: 'Load',
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
            id: 'othersGrid',
            viewModel: 'main',
            width: 600,
            height: 200,
            margin: 20,
            items: [
                {
                    xtype: 'panel',
                    id: 'windContent',
                    width: 400,
                    height: 200,
                    margin: 20,
                    bind: {
                        html : '{startInfo}'
                    }
                },
                {
                    xtype: 'panel',
                    id: 'cloudsContent',
                    width: 400,
                    height: 200,
                    margin: 10
                }
            ]
        }
    ]
})