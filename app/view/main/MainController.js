
let modelOutOfScope; // this variable is needed to obtain query value from the message promt to the outer functions (at the bottom)

Ext.define('ExtWeather.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    viewModel: 'main',

    onTabItemSelected: async function (sender) {
        if(sender.config.title == 'Current Weather')
            Ext.Msg.prompt('Weather', 'Type an english name of the city, which you are looking weather for:', 'onSubmitWeather', this);
        else 
            Ext.Msg.prompt('Forecast', 'Type an english name of the city, which you are looking forecast for:', 'onSubmitForecast', this);
    },

    onSubmitWeather: async function (choice, input) {
        if (choice === 'ok') {
            let vm = this.getViewModel();
            vm.set('query', input);
            modelOutOfScope = vm;
            let json = await getWeather();
            vm.set('weather', json);
        }
    },
    onSubmitForecast: async function (choice, input) {
        if (choice === 'ok') {
            let vm = this.getViewModel();
            vm.set('query', input);
            modelOutOfScope = vm;
            let json = await getForecast();
            vm.set('forecast', json);
        }
    }
});

async function getWeather () {
    let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + modelOutOfScope.data.query 
        +'&appid=435b757eb1a5a697cbb51992ce5d7962');
    return await response.json();
}

async function getForecast () {
    let response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='
        + modelOutOfScope.data.query 
        +'&appid=435b757eb1a5a697cbb51992ce5d7962');
    return await response.json();
}



