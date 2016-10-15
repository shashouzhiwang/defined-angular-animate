/**
 * Created by Loki.Luo on 2016/9/3.
 */
angular
    .module('test')
    .config(['$stateProvider','$locationProvider','$urlRouterProvider',
        function($stateProvider,$locationProvider,$urlRouterProvider){
            $urlRouterProvider.otherwise('/index');
            $stateProvider
                .state('index',{
                    url: "/index",
                        controller:"contentController",
                        templateUrl:'content/content.html',
                        controllerAs:'vm'

                })
            ;
    }]);