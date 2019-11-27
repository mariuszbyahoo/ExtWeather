/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('ExtWeather.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    viewModel: 'main',

    onTabItemSelected: async function (sender, record) {
        Ext.Msg.prompt('Select City', 'Type an english name of the city, which you are looking weather for:', 'onConfirm', this);
    },

    onConfirm: function (choice, input) {
        if (choice === 'ok') {
            var vm = this.getViewModel();
            vm.set('query', input);
            console.log(vm.get('query'));
        }
    },
});
