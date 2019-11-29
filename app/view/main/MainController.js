
Ext.define('ExtWeather.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    viewModel: 'main',

    store: Ext.data.StoreManager.lookup('current'),

    onCurrentSelected: async function (sender) {
            Ext.Msg.prompt('Weather', 'Type an english name of the city, which you are looking weather for:', 'onSubmitWeather', this);
    },

    onForecastSelected: async function (sender) {
            Ext.Msg.prompt('Forecast', 'Type an english name of the city, which you are looking forecast for:', 'onSubmitForecast', this);
    },

    onSubmitWeather: async function (choice, input) {
        if (choice === 'ok') {
            var store = Ext.data.StoreManager.lookup('current');
            let vm = this.getViewModel();
            let grid = Ext.get('currentContent');
            vm.set('query', input);
            store.getProxy().url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
                vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';
             
            store.load();
            store.sync();

            var tempC = store.collect('temp')[0] - 273.15;
            var record = "Temperature: " + tempC + " st. Celsjusza";
            grid.update(record);
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

async function getWeather (query) {
    let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + query 
        +'&appid=435b757eb1a5a697cbb51992ce5d7962');
    return await response.json();
}

async function getForecast (query) {
    let response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='
        + query 
        +'&appid=435b757eb1a5a697cbb51992ce5d7962');
    return await response.json();
}



