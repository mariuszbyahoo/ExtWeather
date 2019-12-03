Ext.define('ExtWeather.view.subsites.ForecastGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'forecastGrid',
    title: '5 day forecast',
    id: 'forecastGrid',
    store: {
        storeId: 'SpecificForecastGridStore',
        model: 'ExtWeather.model.Forecast.SpecificForecastGrid',
        autoLoad: true
    },

    columns:[
        {
            text: 'DateTime',
            flex: 1,
            dataIndex: 'dt_txt',
            dateFormat: 'd/M/y h:m',
            renderer: Ext.util.Format.dateRenderer('D, d/m/Y H:i')
        },
        {
            text: 'Temperature',
            id: 'tempField',
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
            dataIndex: 'humidity',
        }
    ],


    plugins: [
        {
            ptype: 'rowexpander',
            rowBodyTpl: '<p>A tu jest rowBodyTpl</p>',
            rowexpander: true,
            listeners: {
                afterrender: 'afterPanelRender',
                collapsebody: 'collapseRowBody'
            }
        }
    ],
    
    itemConfig: {
        body: {
            tpl: '<p>A tu jest body</p>',

        },
    }
})

    // Tamten z kolei w ogóle nie odpala swoich eventów w ogóle nie wiadomo czemu...
        // {
        // ptype: 'rowwidget',
        // widget: {
        //     xtype: 'panel',
        //     listeners:{
        //         afterrender: 'afterPanelRender',
        //         collapsebody: 'collapseRowBody'
        //     }
        // }