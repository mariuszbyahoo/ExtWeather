Ext.define('ExtWeather.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'ExtWeather.view.main.MainController',
        'ExtWeather.view.main.MainModel',
        'ExtWeather.view.subsites.*'
    ],
    controller: 'main',
    viewModel: 'main',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fas fa-sun'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    ui: 'navigation',

    items: [{
        title: 'Home Page',
        iconCls: 'fas fa-home',
        bind: {
            html: '{homeText}<br />{openWeatherLogo}<br />'
        }
    },{
        title: 'Current Weather',
        iconCls: 'fas fa-info-circle',
        autoScroll: true,
        items: [
            {
                xtype: 'current'
            }
        ],
        listeners:{
            activate: 'onCurrentSelected',
        }
    }, {
        title: 'Weather Forecast',
        iconCls: 'far fa-question-circle',
        autoScroll: true,
        bbar: [
            {
                text: 'Load',
                width: 100,
                align: 'center',
                handler: 'onForecastSelected'
            }
        ],
        items: [
            {
                xtype: 'panel',
                layout: 'auto',
                items: [
                    {
                        xtype: 'forecastMainPanel'
                    }
                ]
            }
        ],
        listeners:{
            activate: 'onForecastSelected',
        }
    }]
});