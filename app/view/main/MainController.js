
Ext.define('ExtWeather.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    viewModel: 'main',

    store: Ext.data.StoreManager.lookup('current'),

    onCurrentSelected: async function () { // => 23
            Ext.Msg.prompt('Weather', 
            'Type an english name of the city, which you are looking weather for:', 
            'onSubmitWeather', this);
    },

    onForecastSelected: async function () {
            Ext.Msg.prompt('Forecast', 
            'Type an english name of the city, which you are looking forecast for:', 
            'onSubmitForecast', this);
    },

    onSubmitWeather: async function (choice, input) { 
        // using regex for check does input containing only letters
        let regex = /^[A-Za-z]+$/; 
        let matches = regex.test(input);

        if (choice === 'ok' && matches) {
            await populateBasicWeatherGrid(input, this.getViewModel()); // => 45
            await populateOthersWeatherGrid(input, this.getViewModel()); // => 85
        } else if (!matches){
            Ext.Msg.alert('Weird chars found', 
                "Write only letters in the city's name, use ONLY english characters" 
                + " do not use any special characters.\n Try again!");
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
        callback : function (records, operation, success) {
            if(success){
                let tempC = store.collect('temp')[0] - 273.15;
                let pressure = store.collect('pressure')[0];
                let humidity = store.collect('humidity')[0];
                let temp_min = store.collect('temp_min')[0];
                let temp_max = store.collect('temp_max')[0];

                tempC = Math.round(tempC * 100 ) / 100;
                let amplitude = Math.round((temp_max - temp_min) * 100) / 100;

                let data = "<div class='data'><p>Temperature: " + tempC + '\u2103' + "</p><p>Pressure: " 
                    + pressure + " hPa </p>" + "<p>Humidity: " + humidity 
                    + "%</p><p>Temperature Amplitude will reach: " + amplitude 
                    + '\u2103' + "</p></div>";

                currentGrid.update(data);
            } else {
                Ext.Msg.alert('404', "City not found in the API... Try again!");
            }
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
            callback : async function(records, operation, success) {
            if(success){
                if(store.collect('deg').length != 0) var deg = store.collect('deg') + '\u00B0';
                else var deg = null; 
                if(store.collect('speed').length != 0) var speed = store.collect('speed') + 'km/h';
                else var speed = null;
                let data = "";

                console.log("speed : ",speed);
                console.log("store.collect('speed').length : ",store.collect('speed').length);


                if(deg != null) data += "<p>Wind blows in degree : " + deg + "</p>";
                if(speed != null) data += "<p>Wind Speed: " + speed + " km/h </p>"; 

                console.log("data : ",data);

                windGrid.update(data);
                await populateCloudsDiv(input, vm); // => 114
                await populateTitle(input, vm); // => 151
            }else {
                console.log('City not found');
            }   
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
            populateVisibilityDiv(input, vm); // => 133
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
            if(visibility){
                let data = "<div class='data'><p>Visibility: "+ visibility +" meters</p></div>";
                visibilityGrid.update(data);
            } else {
                visibilityGrid.update('<p></p>');
            }
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

