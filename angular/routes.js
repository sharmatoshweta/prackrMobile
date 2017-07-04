myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/login-view.html',
            controller:  'loginController',
            controllerAs:'login'
        })
        .when('/password', {
            templateUrl: 'views/password-view.html',
            controller:  'loginController',
            controllerAs:'login'
        })
        .when('/track', {
            templateUrl: 'views/track-view.html',
            controller:  'loginController',
            controllerAs:'login'
        })
        .when('/track2', {
            templateUrl: 'views/track2-view.html',
            controller:  'loginController',
            controllerAs:'login'
        })
        .otherwise({
            templateUrl: 'views/login-view.html'
        });
}]);
