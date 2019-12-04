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
            rowBodyTpl: [
                '<tpl for=".">', // Ten for to potrzebny, bez tego nie dorwie storage'u root'a
                    '<tpl if="temp &lt;=273.15">',
                        '<img src="/resources/winter.jpg"/>',
                    '<tpl elseif="temp &gt;=273.15 &amp;&amp; temp &lt;=278.15">', // zmienne z root'a są osiągalne tu jako nazwa zmiennej.
                        '<img src="/resources/autumn.jpg"/>',
                    '<tpl elseif="temp &gt;278.15 &amp;&amp; temp &lt;=288.15">',
                        '<img src="/resources/spring.jpg"/>',
                    '<tpl elseif="temp &gt;278.15">',    
                        '<img src="/resources/summer.jpg"/>',
                    '</tpl>',
                    "<p>We will have: <b>{description}</b></p>", // Te klamry się odnoszą do Storage!
                    "<p>Minimal Temperature : <b id='min'>{temp_min}</b></p>",
                    "<p>Maximal Temperature : <b>{temp_max}</b></p>",
                    "<br />Wind will blow at: <b>{wind_deg}\u00B0</b> with velocity of: <b>{wind_speed}</b> km/h<hr>",
                    // CONDITIONAL:
                             
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
/*{[console.log(Ext.data.StoreManager.get('SpecificForecastGridStore').data.items[0].data)]} */