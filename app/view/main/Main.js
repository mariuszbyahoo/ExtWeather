/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ExtWeather.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'ExtWeather.view.main.MainController',
        'ExtWeather.view.main.MainModel',
        'ExtWeather.view.subsites.CurrentWeather'
    ],

    controller: 'main',
    viewModel: 'main',

    titleRotation: 0,
    tabRotation: 0,

    ui: 'navigation',

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
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

    items: [{
        title: 'Home Page',
        iconCls: 'fas fa-home',
        // The following grid shares a store with the classic version's grid as well!
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
        ]
    }, {
        title: 'Weather Forecast',
        iconCls: 'far fa-question-circle',
        autoScroll: true,
        items: [
            {
                xtype: 'forecast'
            }
        ]
    }]
});
