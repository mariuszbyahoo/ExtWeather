
Ext.define('ExtWeather.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    viewModel: 'main',

    store: Ext.data.StoreManager.lookup('current'),

    reload: function() {console.log('you clicked me!')},

    onCurrentSelected: async function (sender) {
            Ext.Msg.prompt('Weather', 
            'Type an english name of the city, which you are looking weather for:', 
            'onSubmitWeather', this);
    },

    onForecastSelected: async function (sender) {
            Ext.Msg.prompt('Forecast', 
            'Type an english name of the city, which you are looking forecast for:', 
            'onSubmitForecast', this);
    },

    onSubmitWeather: async function (choice, input) {
        if (choice === 'ok') {
            var store = Ext.data.StoreManager.lookup('current');
            let vm = this.getViewModel();
            let grid = Ext.get('currentContent');
            vm.set('query', input);
            store.getProxy().url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
                vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';
             
            store.load({
                scope: this,
                callback: function() {
                    // Collecting data
                    var tempC = store.collect('temp')[0] - 273.15;
                    var pressure = store.collect('pressure')[0];
                    var humidity = store.collect('humidity')[0];
                    var temp_min = store.collect('temp_min')[0];
                    var temp_max = store.collect('temp_max')[0];

                    // Rounding temperature
                    var tempC = Math.round(tempC * 100 ) / 100;
                    var amplitude = Math.round((temp_max - temp_min) * 100) / 100;

                    // Populating the data in panel
                    var data = "<div class='data'><p>Temperature: " + tempC + " Celsius </p><p>Pressure: " + pressure + " hPa </p>" +
                        "<p>Humidity: " + humidity + "%</p><p>Temperature Amplitude will reach: " + amplitude + " Celsius</p></div>";

                    grid.update(data);
                }
            });            
        }
    },
    onSubmitForecast: async function (choice, input) {
        if (choice === 'ok') {
            let vm = this.getViewModel();
            vm.set('query', input);
            let json = await getForecast(vm.data.query);
            vm.set('forecast', json);
            console.log(vm.get('forecast'));
        }
    }
});
    // let response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='
    //     + query 
    //     +'&appid=435b757eb1a5a697cbb51992ce5d7962');



