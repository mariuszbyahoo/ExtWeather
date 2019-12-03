
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

    onForecastSelected: async function () { // => 39
            Ext.Msg.prompt('Forecast', 
            'Type an english name of the city, which you are looking forecast for:', 
            'onSubmitForecast', this); 
    },

    onSubmitWeather: async function (choice, input) { 
        // using regex for check does input containing only letters (at the beggining)
        let regex = /^[A-Za-z]/; 
        let matches = regex.test(input);

        if (choice === 'ok' && matches) {
            await populateBasicWeatherGrid(input, this.getViewModel()); // => 73
            await populateOthersWeatherGrid(input, this.getViewModel()); // => 93
        } else if (choice === 'ok' && !matches ){
            Ext.Msg.alert('Weird chars found', 
                "Write only letters in the city's name, use ONLY english characters" 
                + " do not use any special characters.\n Try again!");
        } else {

        }
    },
    onSubmitForecast: async function (choice, input) {
        // using regex for check does input containing only letters (at the beggining)
        let regex = /^[A-Za-z]/; 
        let matches = regex.test(input);
        let forecastsCount = 0;

        if (choice === 'ok' && matches) {
            let vm = this.getViewModel();
            let store = Ext.data.StoreManager.lookup('forecastCounter');
            vm.set('query', input);
            store.getProxy().url = 'https://api.openweathermap.org/data/2.5/forecast?q=' +
            vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';

            await store.load({
                scope: this,
                callback: async function(records, operation, success) {
                    if(success){
                        await createPanels(input, vm, store); // => 194
                    } else {
                        Ext.Msg.alert('404', "City not found in the API... Try again!");
                    }
                }
            });
        } else if (choice === 'ok' && !matches){
            Ext.Msg.alert('Weird chars found', 
                "Write only letters in the city's name, use ONLY english characters" 
                + " do not use any special characters.\n Try again!");
        }
        else {

        }
    },

    onGridForecastSelected : async function (){
        let SpecificForecastGridStore = Ext.data.StoreManager.lookup('SpecificForecastGridStore')
        SpecificForecastGridStore.load();
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
                if(deg != null) data += "<p>Wind blows in degree : " + deg + "</p>";
                if(speed != null) data += "<p>Wind Speed: " + speed + " km/h </p>"; 
                windGrid.update(data);
                await populateCloudsDiv(input, vm); // => 125
                await populateTitle(input, vm); // => 164
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
            populateVisibilityDiv(input, vm); // => 143
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
        Ext.ComponentManager.get('currentRootPanel').setTitleAlign('center'); 
        }
    });
}

//  FORECAST FUNCTIONS:

async function createPanels(input, vm, counterStore){
    let mainPanel = Ext.ComponentManager.get('forecastMainPanel'); 
    let forecastsCount = counterStore.count();

    if(vm.get('areForecastsPopulated') == true) mainPanel.removeAll(true);

    for(let i = 0 ; i < forecastsCount ; i++) {
        let specificForecastDataStore = new ExtWeather.store.Forecast.SpecificForecast(); 
            //creating a new store because of the asynchronousness
            // Change the store's URL and get the data.
        specificForecastDataStore.getProxy().getReader().setRootProperty('list['+ i +'].main');
        vm.set('query', input);
        specificForecastDataStore.getProxy().url = 'https://api.openweathermap.org/data/2.5/forecast?q=' +
            vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';
        await specificForecastDataStore.load({ 
            scope: this,
            callback : async function (records, operation, success) {
                if(success){

                   let currentPanel = new Ext.panel.Panel({
                       xtype: 'specificForecastPanel', // adding this will make destroying easier
                       titleAlign: 'center'
                   });

                   // Cannot set it nicely, (title first) because of that the status of store's call will be 
                   // unknown at the beginning, must be in specificForecastDataStore.load()'s callback
                    if(i === 0){ // Setting the Main panel's title:
                        let forecastCityStore = Ext.data.StoreManager.lookup('forecastCity');
                        forecastCityStore.getProxy().url = specificForecastDataStore.getProxy().url;
                        await forecastCityStore.load({
                            scope: this,
                            callback: async function (records, operation, success){
                                if(success){
                                    Ext.ComponentManager.get('forecastMainPanel').
                                        setTitle('Weather Forecast for: ' + forecastCityStore.collect('name'));
                                }
                            }
                        });
                    }

                    let tempC = specificForecastDataStore.collect('temp')[0] - 273.15;
                    let pressure = specificForecastDataStore.collect('pressure')[0];
                    let humidity = specificForecastDataStore.collect('humidity')[0];

                    tempC = Math.round(tempC * 100 ) / 100;

                    // and create a panel in ForecastMainPanel with them
                    let data = "<div class='data'><p>Temperature: " + tempC + '\u2103' + "</p><p>Pressure: " 
                        + pressure + " hPa </p>" + "<p>Humidity: " + humidity + "</p></div>";

                    currentPanel.update(data); 

                    currentPanel.setTitle(counterStore.collect('dt_txt')[i]);
                    mainPanel.insert(i, currentPanel); 
                    mainPanel.updateLayout();
                    vm.set('areForecastsPopulated', true);
                } else {
                    Ext.Msg.alert('404', "City not found in the API... Try again!");
                }
            }
        });
    };
}