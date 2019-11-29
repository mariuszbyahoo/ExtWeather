Ext.define('ExtWeather.view.subsites.CurrentWeather',{
    extend: 'Ext.panel.Panel',
    xtype: 'current',
    layout: 'hbox',
    viewModel: 'main',

    // Jakoś musi nasłuchiwać tutaj eventu 'reload' i po tym 
    // (jak się zamknie prompt i w VM będzie już pogoda) załadować 

    items: [
        {
            xtype: 'panel',
            title: 'Numbers',
            width: 600,
            height: 200,
            margin: 20,
            id: 'numbers', // Nadanie komuś takiego id nadaje go także w zrenderowanym DOM
            items : {
                xtype: 'grid',
                columns: [
                    {text: 'Temperature', dataIndex: 'temp'},
                    {text: 'Pressure', dataIndex: 'pressure'},
                    {text: 'Humidity', dataIndex: 'humidity'},
                    {text: 'Temp. Max', dataIndex: 'temp_max'},
                    {text: 'Temp. Min', dataIndex: 'temp_min'}
                ],           
                store: {type: 'current'}, 
                flex: 1
            },
            listeners: {

            }
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