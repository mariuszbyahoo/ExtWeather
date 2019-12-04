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
            dataIndex: 'temp',
            renderer: function(kelvin){
                return ((Math.round(kelvin - 273.15) * 100) / 100) + ' &#8451';
            }
        },
        {
            text: 'Pressure',
            flex: 1,
            dataIndex: 'pressure',
            renderer: function(val){
                return val + ' hPa';
            }
        },
        {
            text: 'Humidity',
            flex: 1,
            dataIndex: 'humidity',
            renderer: function(val){
                return val + ' %';
            }
        }
    ],

    plugins: [
        {
            ptype: 'rowexpander',
            rowBodyTpl: [
                '<hr>',
                '<tpl for=".">', // Ten for to potrzebny, bez tego nie dorwie storage'u root'a
                '<tpl switch="new Date().getMonth()">',
                    '<tpl case="0" case="1" case="2" case="11">',
                        '<img src="/resources/winter.jpg" align="right"/>',
                    '<tpl case="3" case="4">',
                        '<img src="/resources/spring.jpg align="center"/>',
                    '<tpl case="5" case="6" case="7">',    
                        '<img src="/resources/summer.jpg align="center"/>', 
                    '<tpl case="8" case="9" case="10">',    
                        '<img src="/resources/autumn.jpg align="center"/>',                                           
                    '<tpl default>',
                        '<p>Here should be a wonderfull image, but something fckdup</p>',
                    '</tpl>',
                    "<p>We will have: <b>{description}</b></p>", // Te klamry się odnoszą do Storage!
                    "<p>Minimal Temperature : <b id='min'>{temp_min}</b></p>",
                    "<p>Maximal Temperature : <b>{temp_max}</b></p>",
                    "<br />Wind will blow at: <b>{wind_deg}\u00B0</b> with velocity of: <b>{wind_speed}</b> km/h",         
                '</tpl>'
            ],
            rowexpander: true,
            listeners: {
                afterrender: 'afterPanelRender',
                collapsebody: 'collapseRowBody'
            },           
        }
    ]
})
