
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
            await populateBasicWeatherGrid(input, this.getViewModel());
            await populateOthersWeatherGrid(input, this.getViewModel());
        }
    },
    onSubmitForecast: async function (choice, input) {
        if (choice === 'ok') {
            let store = Ext.data.StoreManager.lookup('forecast');
            let vm = this.getViewModel();
            vm.set('query', input);
        }
    }
});

async function populateBasicWeatherGrid(input, vm) {
    let store = Ext.data.StoreManager.lookup('current');
    store.getProxy().getReader().setRootProperty('main');
    let currentGrid = Ext.get('currentContent');
    vm.set('query', input);
    store.getProxy().url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';
     
    await store.load({
        scope: this,
        callback : function () {
            // POPULATING FIRST GRID
            console.log('populating the currentWeather grid');
            // Collecting data
            let tempC = store.collect('temp')[0] - 273.15;
            let pressure = store.collect('pressure')[0];
            let humidity = store.collect('humidity')[0];
            let temp_min = store.collect('temp_min')[0];
            let temp_max = store.collect('temp_max')[0];
            console.log(tempC, '*C ', pressure, ' hPa ', humidity, '%');

            // Rounding temperature
            tempC = Math.round(tempC * 100 ) / 100;
            let amplitude = Math.round((temp_max - temp_min) * 100) / 100;

            // Populating the data in panel
            let data = "<div class='data'><p>Temperature: " + tempC + " Celsius </p><p>Pressure: " 
                + pressure + " hPa </p>" + "<p>Humidity: " + humidity 
                + "%</p><p>Temperature Amplitude will reach: " + amplitude 
                + " Celsius</p></div>";

            currentGrid.update(data);
        }
    });


}

async function populateOthersWeatherGrid(input, vm) {
    console.log('populating the Others grid');
    let store = Ext.data.StoreManager.lookup('wind');
        
    vm.set('query', input);
    store.getProxy().url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';
    let windGrid = Ext.get('windContent');

    await store.load({
        scope: this,
        callback : async function() {
            if(store.collect('deg').length != 0) var deg = store.collect('deg') + "*";
            else var deg = " specific direction is not provided by the API."; 
            let data = "<div class='data'><p>Wind Speed: " + store.collect('speed') 
            + " km/h </p><p>Wind blows in degree : " + deg + "</div>";
            console.log(store.collect('speed'), 'km/h', deg);
            windGrid.update(data);
            await populateCloudsDiv(input, vm); 
            await populateTitle(input, vm);
        }
    });   
}

async function populateCloudsDiv(input, vm){
    let store = Ext.data.StoreManager.lookup('clouds');
    let cloudsGrid = Ext.get('cloudsContent');

    vm.set('query', input);
    store.getProxy().url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';
    await store.load({
        scope: this,
        callback: function () {
            let clouds = store.collect('description')[0];
            let data = "<div class='data'><p>Overall description: "+ clouds +"</p></div>";
            cloudsGrid.update(data)
            console.log(clouds);
            populateVisibilityDiv(input, vm);
        }
    });
}

async function populateVisibilityDiv(input, vm) {
    let store = Ext.data.StoreManager.lookup('rootInfo');
    let visibilityGrid = Ext.get('visibilityContent');

    vm.set('query', input);
    store.getProxy().url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';
    await store.load({
        scope: this,
        callback: function () {
            let visibility = store.collect('visibility')[0];
            let data = "<div class='data'><p>Visibility: "+ visibility +" meters</p></div>";
            visibilityGrid.update(data)
            console.log(visibility);
        }
    });
}

async function populateTitle(input, vm){
    let store = Ext.data.StoreManager.lookup('rootInfo');
    vm.set('query', input);
    store.getProxy().url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';
    await store.load({
        scope: this,
        callback: function () {
        let title = store.collect('name')[0];
        Ext.ComponentManager.get('currentRootPanel').setTitle('Weather in ' + title); 
        }
    });
}

