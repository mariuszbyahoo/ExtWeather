
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
            store.load();
            // W tym momencie pobiera asynchronicznie dane które ma wyświetlić, ale z gdy renderuje 
            // po wykonaniu operacji powinien zrenderować pole ponownie
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



