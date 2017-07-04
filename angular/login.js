myApp.controller('loginController', ['$http', '$scope','apiOne', function($http, $scope, apiOne) {
    
    $scope.loginActive = true;

    $scope.goToPassword = function() {
    	console.log($scope.userId);
    	Cookies.set('userDetails', $scope.userId);
        window.location = '#/password';

    }

    $scope.login = function() {
    	console.log("login");

        document.getElementById('loginBtn').disabled = true;
        $scope.user = Cookies.get('userDetails');
        console.log($scope.user);

        var myData = {
            email: $scope.user,
            password: $scope.password
        }
        console.log(myData);
        apiOne.login(myData)
            .then(function successCallback(response) {

                if (response.data.status == 404) {
                    document.getElementById('loginBtn').disabled = false;
                } else {
                    console.log("userlogin");
                    console.log(response.data.data);
                    $scope.prackrAuth = response.data.data
                    Cookies.set('prackrAuth', $scope.prackrAuth);
                    setTimeout(function() {

                        window.location = '#/track';

                    }, 2000);
                }

                console.log(response);
            }, function errorCallback(response) {

                console.log(response);

            });
    }
}]);
