
Ext.define('ExtWeather.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    viewModel: 'main',

    store: Ext.data.StoreManager.lookup('current'),

    logCsv: async function() {
        const vm = this.getViewModel();
        let voivodeshipCapitalsArr = vm.get('voivodeshipCapitals').split(',');
        console.log(voivodeshipCapitalsArr);
        for(let i = 0; i < voivodeshipCapitalsArr.length; i ++){
            console.log(voivodeshipCapitalsArr[i]);
            voivodeshipsWeatherInfoGen(voivodeshipCapitalsArr[i]);
        }
        function voivodeshipsWeatherInfoGen(cityName) {
            window.setInterval(logData, 900000); // 15min.
            async function logData() {
                let header = '#city_name;timezone;current_timestamp;lon;lat;weather;tempC;humidity;visibility;wind_speed;wind_deg;clouds\n';
                let record = '';
                const xhr = new XMLHttpRequest();
                xhr.responseType = "json";
                xhr.addEventListener("load", function() {
                    if (xhr.status === 200) {
                        let json = xhr.response;
                        let arr = new Array();

                        // take the cityName:
                        let cityName = '\"' + json["name"] + '\"';
                        arr.push(cityName);

                        // take the timezone:
                        let timeZone = json["timezone"];
                        arr.push(timeZone);

                        // take the hrs:
                        let now = json["dt"]*1000; // get the current moment UNIX timestamp, & convert to MiliSeconds
                        arr.push(now)

                        // take the coords:
                        let lon = json["coord"]["lon"];
                        arr.push(lon);
                        let lat = json["coord"]["lat"];
                        arr.push(lat);

                        // take the weather desc
                        let weather = '\"' + json["weather"][0]["description"] + '\"'; // string
                        arr.push(weather);
                        // take the temperature
                        let temp = (Math.round(json["main"]["temp"] - 273.15) * 100) / 100; // Celsius
                        arr.push(temp);
                        // take the humidity
                        let humidity = json["main"]["humidity"]; // Percent
                        arr.push(humidity);
                        // take the visibility
                        let visibility = json["visibility"]; // Meters
                        arr.push(visibility);
                        // take the wind speed
                        let windSpeed = json["wind"]["speed"]; // km/h
                        arr.push(windSpeed);
                        // take the wind deg
                        let windDeg = json["wind"]["deg"]; // Azymut
                        arr.push(windDeg);
                        // take the clouds
                        let clouds = json["clouds"]["all"]; // Is this a percentage?
                        arr.push(clouds);

                        console.log(arr);

                        if(!vm.get('headerWasSet')){
                            record = header;
                            vm.set('headerWasSet', true);
                        }

                        record += arr.join(';'); 
                        startLog = vm.get('weatherLog');
                        let newLog = startLog + record + '\n';
                        vm.set('weatherLog', newLog);
                        console.log('CsvAppend');
                    }
                });
                
                xhr.addEventListener("error", function() {
                    alert("Niestety nie udało się nawiązać połączenia");
                });
                xhr.open("GET", 'https://api.openweathermap.org/data/2.5/weather?q='+cityName
                    +'&appid=435b757eb1a5a697cbb51992ce5d7962', true);

                xhr.send();
            }
        }
    },

    downloadCsvLog: function() {
        let vm = this.getViewModel();
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(vm.get('weatherLog')));
        element.setAttribute('download', "CsvData.csv");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element); 
        console.log('CsvDownload');       
    },

    onCurrentSelected: async function () { 
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
        // using regex for check does input containing only letters (at the beggining)
        let regex = /^[A-Za-z]/; 
        let matches = regex.test(input);
        let vm = this.getViewModel();

        if (choice === 'ok' && matches) {
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

            let windStore = Ext.data.StoreManager.lookup('wind');
            vm.set('query', input);
            windStore.getProxy().url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
                vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';
            let windGrid = Ext.get('windContent');

            await windStore.load({
                scope: this,
                callback : async function(records, operation, success) {
                    if(success){
                        if(windStore.collect('deg').length != 0) var deg = windStore.collect('deg') + '\u00B0';
                        else var deg = null; 
                        if(windStore.collect('speed').length != 0) var speed = windStore.collect('speed') + 'km/h';
                        else var speed = null;
                        let data = "";
                        if(deg != null) data += "<p>Wind blows in degree : " + deg + "</p>";
                        if(speed != null) data += "<p>Wind Speed: " + speed + " km/h </p>"; 
                        windGrid.update(data);
                        let cloudStore = Ext.data.StoreManager.lookup('clouds');
                        let cloudsGrid = Ext.get('cloudsContent');
                    
                        vm.set('query', input);
                        cloudStore.getProxy().url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
                            vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';
                        await cloudStore.load({
                            scope: this,
                            callback: async function () {
                                let clouds = cloudStore.collect('description')[0];
                                let data = "<div class='data'><p>Overall description: "+ clouds +"</p></div>";
                                cloudsGrid.update(data)
                                let visibilityStore = Ext.data.StoreManager.lookup('rootInfo');
                                let visibilityGrid = Ext.get('visibilityContent');

                                vm.set('query', input);
                                visibilityStore.getProxy().url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
                                    vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';
                                await visibilityStore.load({
                                    scope: this,
                                    callback: function () {
                                        let visibility = visibilityStore.collect('visibility')[0];
                                        if(visibility){
                                            let data = "<div class='data'><p>Visibility: "+ visibility +" meters</p></div>";
                                            visibilityGrid.update(data);
                                        } else {
                                            visibilityGrid.update('<p></p>');
                                        }
                                    }
                                });
                            }
                        });
                        let rootStore = Ext.data.StoreManager.lookup('rootInfo');
                        vm.set('query', input);
                        rootStore.getProxy().url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
                            vm.get('query') + '&appid=435b757eb1a5a697cbb51992ce5d7962';
                        await rootStore.load({
                            scope: this,
                            callback: function () {
                                let title = rootStore.collect('name')[0];
                                Ext.ComponentManager.get('currentRootPanel').setTitle('Weather in ' + title); 
                                Ext.ComponentManager.get('currentRootPanel').setTitleAlign('center'); 
                                }
                            });
                    }else {
                        console.log('City not found');
                    }   
                }   
            }); 
        } else if (choice === 'ok' && !matches ){
            Ext.Msg.alert('Weird chars found', 
                "Write only letters in the city's name, use ONLY english characters" 
                + " do not use any special characters.\n Try again!");
        } else {
            Ext.Msg.alert('404', "City not found in the API... Try again!");
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
                        let mainPanel = Ext.ComponentManager.get('forecastMainPanel'); 
                        let forecastsCount = counterStore.count();
                    
                        if(vm.get('areForecastsPopulated') == true) mainPanel.removeAll(true);
                    
                        for(let i = 0 ; i < forecastsCount ; i++) {
                            let specificForecastDataStore = new ExtWeather.store.Forecast.SpecificForecast(); 

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
        let SpecificForecastGridStore = Ext.data.StoreManager.lookup('SpecificForecastGridStore');
        SpecificForecastGridStore.load();
    },
});