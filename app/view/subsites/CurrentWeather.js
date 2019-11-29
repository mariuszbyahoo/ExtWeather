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
                        xtype: 'dataview',
                        id: 'currentContent',
                        width: 450,
                        height: 150,
                        margin: 20,
                        viewModel: 'main',
                        tpl: new Ext.XTemplate(
                            '{temp}'
                        ),
                        itemSelector: 'p',
                        listeners: {
                            itemclick: 'reload'
                        }
                        
                    }
                ]
        },
        {
            xtype: 'panel',
            title: 'Visibility, clouds, and wind',
            width: 600,
            height: 200,
            margin: 20,
            bind: {
                html : '{weather}'
            }
        }
    ]
})